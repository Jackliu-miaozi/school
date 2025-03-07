'use client';

import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import {
  useRouter,
  useSearchParams,
} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo =
    searchParams.get('redirectTo');
  //如果redirectTo的值存在就获取他的值，如果不存在就是null。

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    captcha: '',
  });
  const [error, setError] = useState('');
  const [captchaData, setCaptchaData] = useState({
    id: '',
    image: '',
  });
  const [isLoading, setIsLoading] =
    useState(false);
  const [captchaLoading, setCaptchaLoading] =
    useState(true);

  // 获取验证码
  // 在文件顶部添加接口定义
  interface CaptchaResponse {
    captchaId: string;
    captchaImage: string;
  }
  
  // 修改 fetchCaptcha 函数中的相关代码
  const fetchCaptcha = async () => {
    setCaptchaLoading(true);
    try {
      const response = await fetch(
        '/api/captcha',
        {
          // 添加缓存控制，防止浏览器缓存验证码
          headers: {
            'Cache-Control':
              'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: '0',
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          `获取验证码失败: ${response.status}`,
        );
      }

      // 添加类型断言
      const data = (await response.json()) as CaptchaResponse;
      
      if (!data.captchaId || !data.captchaImage) {
        throw new Error('验证码数据不完整');
      }

      setCaptchaData({
        id: data.captchaId,
        image: data.captchaImage,
      });

      // 重置验证码输入
      setFormData((prev) => ({
        ...prev,
        captcha: '',
      }));
    } catch (error) {
      console.error(
        '获取验证码失败:',
        error instanceof Error
          ? error.message
          : String(error),
      );
      setError('获取验证码失败，请刷新页面重试');
    } finally {
      setCaptchaLoading(false);
    }
  };

  // 页面加载时获取验证码
  useEffect(() => {
    void fetchCaptcha().catch((error) => {
      console.error(
        '页面加载时获取验证码失败:',
        error,
      );
    });
  }, []);

  // 验证验证码
  const verifyCaptcha = async () => {
    try {
      const response = await fetch(
        '/api/verify-captcha',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            captchaId: captchaData.id,
            captchaText: formData.captcha,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          `验证码验证请求失败: ${response.status}`,
        );
      }

      const data = (await response.json()) as { valid: boolean };
      return data.valid;
    } catch (error) {
      console.error('验证码验证失败:', error);
      return false;
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 表单验证
      if (
        !formData.email ||
        !formData.password ||
        !formData.captcha
      ) {
        setError('请填写所有必填字段');
        setIsLoading(false);
        return;
      }

      // 先验证验证码
      const isCaptchaValid =
        await verifyCaptcha();

      if (!isCaptchaValid) {
        setError('验证码错误或已过期');
        void fetchCaptcha().catch(error => {
          console.error('刷新验证码失败:', error);
        }); // 刷新验证码
        setIsLoading(false);
        return;
      }

      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
        callbackUrl: redirectTo ?? '/',
      });

      if (result?.error) {
        setError('邮箱或密码错误');
        void fetchCaptcha().catch((error: unknown) => {
          if (error instanceof Error) {
            console.error('刷新验证码失败:', error.message);
          } else {
            console.error('刷新验证码失败:', String(error));
          }
        }); // 刷新验证码
      } else {
        // 登录成功，跳转
        void router.push(redirectTo || '/').catch((error: unknown) => {
          if (error instanceof Error) {
            console.error('页面跳转失败:', error.message);
          } else {
            console.error('页面跳转失败:', String(error));
          }
        });
        router.refresh(); // 刷新页面状态
      }
    } catch (error) {
      console.error('登录错误:', error);
      setError('登录失败，请稍后重试');
      void fetchCaptcha().catch(error => {
        console.error('刷新验证码失败:', error);
      }); // 刷新验证码
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#f3f4f6]">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            登录
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="rounded-md bg-red-100 p-3 text-red-600">
              {error}
            </div>
          )}
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                邮箱地址
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="username"
                className="relative mt-1 block w-full rounded-md border border-gray-200 p-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="请输入邮箱地址"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                密码
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="relative mt-1 block w-full rounded-md border border-gray-200 p-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="请输入密码"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />
            </div>

            {/* 验证码部分 */}
            <div>
              <label
                htmlFor="captcha"
                className="block text-sm font-medium text-gray-700"
              >
                验证码
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <input
                  id="captcha"
                  name="captcha"
                  type="text"
                  required
                  className="relative block w-full rounded-md border border-gray-200 p-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="请输入验证码"
                  value={formData.captcha}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      captcha: e.target.value,
                    })
                  }
                />
                <div
                  className="flex h-10 w-32 flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded border"
                  onClick={fetchCaptcha}
                >
                  {captchaLoading ? (
                    <div className="animate-pulse text-xs text-gray-400">
                      加载中...
                    </div>
                  ) : captchaData.image ? (
                    <Image
                      src={captchaData.image}
                      alt="验证码"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-xs text-red-500">
                      加载失败
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                点击图片刷新验证码
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={
                isLoading || captchaLoading
              }
              className={`group relative flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                isLoading || captchaLoading
                  ? 'cursor-not-allowed bg-indigo-400'
                  : 'bg-indigo-600 hover:bg-indigo-500'
              }`}
            >
              {isLoading ? '登录中...' : '登录'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link
            href="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            没有账号？点击注册
          </Link>
        </div>
      </div>
    </div>
  );
}
