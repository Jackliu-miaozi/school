'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/trpc/react';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [passwordChecks, setPasswordChecks] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumbers: false,
    hasSpecialChar: false,
    passwordsMatch: false,
  });

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) return '密码长度至少8位';
    if (!hasUpperCase) return '密码需要包含大写字母';
    if (!hasLowerCase) return '密码需要包含小写字母';
    if (!hasNumbers) return '密码需要包含数字';
    if (!hasSpecialChar) return '密码需要包含特殊字符';

    return '';
  };

  const checkPasswordStrength = (password: string) => {
    setPasswordChecks({
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumbers: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      passwordsMatch: password === formData.confirmPassword && password !== '',
    });
  };

  const validatePasswords = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return false;
    }
    return true;
  };
  const registerMutation = api.register.register.useMutation({
    onSuccess: () => {
      router.push('/login');
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    if (!validatePasswords()) {
      return;
    }
    try {
      registerMutation.mutate(formData);
    } catch (error) {
      setError(error as string);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white/10 p-6 text-white">
        <div>
          <h2 className="text-center text-3xl font-bold">注册账号</h2>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
          autoComplete="on"
        >
          {error && (
            <div className="rounded-md bg-red-500 p-3 text-white">{error}</div>
          )}
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="sr-only">
                用户名
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="relative block w-full rounded-md border-0 p-2 text-gray-900"
                placeholder="用户名"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                邮箱地址
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="username"
                className="relative block w-full rounded-md border-0 p-2 text-gray-900"
                placeholder="邮箱地址"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="new-password" className="sr-only">
                密码
              </label>
              <input
                id="new-password"
                name="new-password"
                type="password"
                required
                autoComplete="new-password"
                className="relative block w-full rounded-md border-0 p-2 text-gray-900"
                placeholder="密码"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  checkPasswordStrength(e.target.value);
                }}
              />
              <div className="mt-1 text-sm">
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <li
                    className={`flex items-center gap-2 ${
                      passwordChecks.minLength
                        ? 'text-green-400'
                        : 'text-gray-300'
                    }`}
                  >
                    {passwordChecks.minLength ? '✓' : '○'} 至少8位字符
                  </li>
                  <li
                    className={`flex items-center gap-2 ${
                      passwordChecks.hasUpperCase
                        ? 'text-green-400'
                        : 'text-gray-300'
                    }`}
                  >
                    {passwordChecks.hasUpperCase ? '✓' : '○'} 包含大写字母
                  </li>
                  <li
                    className={`flex items-center gap-2 ${
                      passwordChecks.hasLowerCase
                        ? 'text-green-400'
                        : 'text-gray-300'
                    }`}
                  >
                    {passwordChecks.hasLowerCase ? '✓' : '○'} 包含小写字母
                  </li>
                  <li
                    className={`flex items-center gap-2 ${
                      passwordChecks.hasNumbers
                        ? 'text-green-400'
                        : 'text-gray-300'
                    }`}
                  >
                    {passwordChecks.hasNumbers ? '✓' : '○'} 包含数字
                  </li>
                  <li
                    className={`flex items-center gap-2 ${
                      passwordChecks.hasSpecialChar
                        ? 'text-green-400'
                        : 'text-gray-300'
                    }`}
                  >
                    {passwordChecks.hasSpecialChar ? '✓' : '○'} 包含特殊字符
                  </li>
                  <li
                    className={`flex items-center gap-2 ${
                      passwordChecks.passwordsMatch
                        ? 'text-green-400'
                        : 'text-gray-300'
                    }`}
                  >
                    {passwordChecks.passwordsMatch ? '✓' : '○'} 两次密码输入一致
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <label htmlFor="new-password-confirm" className="sr-only">
                确认密码
              </label>
              <input
                id="new-password-confirm"
                name="new-password-confirm"
                type="password"
                required
                autoComplete="new-password"
                className="relative block w-full rounded-md border-0 p-2 text-gray-900"
                placeholder="确认密码"
                value={formData.confirmPassword}
                onChange={(e) => {
                  const newConfirmPassword = e.target.value;
                  setFormData({
                    ...formData,
                    confirmPassword: newConfirmPassword,
                  });
                  setPasswordChecks((prev) => ({
                    ...prev,
                    passwordsMatch:
                      formData.password === newConfirmPassword &&
                      formData.password !== '',
                  }));
                }}
              />
              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">
                    两次输入的密码不一致
                  </p>
                )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              注册
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link
            href="/api/auth/signin"
            className="font-medium text-indigo-300 hover:text-indigo-200"
          >
            已有账号？点击登录
          </Link>
        </div>
      </div>
    </div>
  );
}
