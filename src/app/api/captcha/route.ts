import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import svgCaptcha from 'svg-captcha';

export const runtime = 'nodejs'; // 使用 Node.js 运行时

// 生成SVG验证码
export async function GET(req: NextRequest) {
  try {
    // 使用 svg-captcha 生成验证码
    const captcha = svgCaptcha.create({
      size: 4, // 验证码长度
      ignoreChars: '0o1ilI', // 排除容易混淆的字符
      noise: 3, // 干扰线条数
      color: true, // 验证码的颜色
      background: '#f0f0f0', // 背景色
      width: 150,
      height: 50,
    });
    
    // 获取验证码文本和SVG
    const captchaText = captcha.text;
    const captchaSvg = captcha.data;
    
    // 创建一个哈希值作为验证码ID
    const captchaId = crypto.randomBytes(16).toString('hex');
    
    // 设置Cookie存储验证码文本，用于后续验证
    const response = NextResponse.json({
      captchaId,
      captchaImage: `data:image/svg+xml;utf8,${encodeURIComponent(captchaSvg)}`
    });
    
    // 设置Cookie，10分钟有效
    response.cookies.set({
      name: `captcha_${captchaId}`,
      value: captchaText,
      httpOnly: true,
      maxAge: 600, // 10分钟，单位是秒
      path: '/',
      sameSite: 'lax', // 修改为lax，增加兼容性
      secure: process.env.NODE_ENV === 'production', // 仅在生产环境使用secure
    });
    
    // 添加CORS头
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return response;
  } catch (error) {
    console.error('生成验证码错误:', error);
    return NextResponse.json({ error: '生成验证码失败' }, { status: 500 });
  }
}