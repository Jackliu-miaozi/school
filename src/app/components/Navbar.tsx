'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Navbar() {
  const { data: session } = useSession();
  //和const session = await auth() 效果一样
  //但是useSession() 是客户端组件
  //useSession() 返回一个包含 session 和 status 的对象
  //session 是当前用户的会话数据，如果用户未登录，则 session 为 null
  //status 是会话的状态，可以是 "authenticated"（已登录）、"loading"（正在加载）或 "unauthenticated"（未登录）
  //useSession() 是客户端组件，所以不能在服务器端使用
  //auth（）是服务器端组件，所以可以在服务器端使用


  return (
    <nav className="fixed left-0 right-0 top-0 bg-white/10 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo 区域 */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="青州一中" width={40} height={40} />
              <span className="text-2xl font-bold text-white">青州一中</span>
            </Link>
          </div>

          {/* 导航菜单区域 */}
          <div className="hidden space-x-8 md:flex">
            <Link href="/news" className="text-white hover:text-gray-300">
              校内新闻
            </Link>
            <Link href="/notice" className="text-white hover:text-gray-300">
              学校公告
            </Link>
            <Link href="/forum" className="text-white hover:text-gray-300">
              教育论坛
            </Link>
            <Link href="/education" className="text-white hover:text-gray-300">
              教务信息
            </Link>
          </div>

          {/* 登录注册按钮区域 */}
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
                >
                  进入后台
                </Link>
                <Link
                  href="/logout"
                  className="rounded-md px-3 py-2 text-sm font-medium text-white hover:text-gray-300"
                >
                  退出登录
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-md px-3 py-2 text-sm font-medium text-white hover:text-gray-300"
                >
                  登录
                </Link>
                <Link
                  href="/register"
                  className="rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
                >
                  注册
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
