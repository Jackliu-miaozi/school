import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const { pathname } = req.nextUrl;

  // 如果请求的是 /dashboard 且没有 token，则重定向到登录页面
  if (pathname.startsWith('/dashboard') && !token) {
    const loginUrl = new URL('/login', req.url);
    const requestedUrl = req.nextUrl.href;
    loginUrl.searchParams.set('redirectTo', requestedUrl);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
  
}

export const config = {
  matcher: ['/dashboard/:path*']
};
