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
  const [dropdowns] = useState([
    { id: 1, title: '菜单1', items: ['选项1', '选项2', '选项3'] },
    { id: 2, title: '菜单2', items: ['选项1', '选项2', '选项3'] },
    { id: 3, title: '菜单3', items: ['选项1', '选项2', '选项3'] },
    { id: 4, title: '菜单4', items: ['选项1', '选项2', '选项3'] },
    { id: 5, title: '菜单5', items: ['选项1', '选项2', '选项3'] },
  ]);

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
            {dropdowns.map((dropdown) => (
              <div key={dropdown.id} className="group relative">
                <button className="px-3 py-2 text-sm font-medium text-white hover:text-gray-300">
                  {dropdown.title}
                </button>
                {/* 下拉菜单 */}
                <div className="invisible absolute left-0 mt-2 w-48 rounded-md bg-white opacity-0 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                  <div className="py-1">
                    {dropdown.items.map((item, index) => (
                      <a
                        key={index}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
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
