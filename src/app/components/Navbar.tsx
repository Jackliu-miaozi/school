"use client";
import { useState } from 'react';
import Link from 'next/link';
import type { Session } from "next-auth";

interface NavbarProps {
  session: Session | null;
}

export default function Navbar({ session }: NavbarProps) {
  
  const [dropdowns] = useState([
    { id: 1, title: '菜单1', items: ['选项1', '选项2', '选项3'] },
    { id: 2, title: '菜单2', items: ['选项1', '选项2', '选项3'] },
    { id: 3, title: '菜单3', items: ['选项1', '选项2', '选项3'] },
    { id: 4, title: '菜单4', items: ['选项1', '选项2', '选项3'] },
    { id: 5, title: '菜单5', items: ['选项1', '选项2', '选项3'] },
  ]);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo 区域 */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-white text-2xl font-bold">
              LOGO
            </Link>
          </div>

          {/* 导航菜单区域 */}
          <div className="hidden md:flex space-x-8">
            {dropdowns.map((dropdown) => (
              <div key={dropdown.id} className="relative group">
                <button className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
                  {dropdown.title}
                </button>
                {/* 下拉菜单 */}
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
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
                  className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  进入后台
                </Link>
                <Link
                  href="/api/auth/signout"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  退出登录
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  登录
                </Link>
                <Link
                  href="/register"
                  className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
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