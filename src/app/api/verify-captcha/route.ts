import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // 添加运行时配置

export async function POST(req: NextRequest) {
  try {
    const { captchaId, captchaText } = await req.json() as { captchaId: string; captchaText: string };
    
    // 从Cookie中获取验证码
    const storedCaptcha = req.cookies.get(`captcha_${captchaId}`)?.value;
    
    if (!storedCaptcha) {
      return NextResponse.json({ valid: false, message: '验证码已过期' }, { status: 400 });
    }
    
    // 验证码比较（不区分大小写）
    const isValid = storedCaptcha.toLowerCase() === captchaText.toLowerCase();
    
    // 验证后删除Cookie
    const response = NextResponse.json({ valid: isValid });
    if (isValid) {
      // 确保删除Cookie时使用与设置时相同的路径
      response.cookies.delete({
        name: `captcha_${captchaId}`,
        path: '/',
        sameSite: 'strict'
      });
    }
    
    return response;
  } catch (error) {
    console.error('验证码验证错误:', error);
    return NextResponse.json({ valid: false, message: '验证失败' }, { status: 500 });
  }
}