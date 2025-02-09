'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Session } from 'next-auth';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  session: Session | null;
}
export default function Navbar2({
  session,
}: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] =
    React.useState(false);
  const [isNavOpen, setIsNavOpen] =
    React.useState(false);

  // 添加点击外部关闭菜单的处理函数
  React.useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent,
    ) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest('.user-menu-container')
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener(
      'click',
      handleClickOutside,
    );
    return () => {
      document.removeEventListener(
        'click',
        handleClickOutside,
      );
    };
  }, []);

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between">
      {/* 左侧导航栏 */}
      <div className="mx-4 my-3 flex items-center rounded-full bg-white shadow-md">
        <Link
          className="mx-auto hidden items-center px-4 md:block"
          href="/"
        >
          <Image
            src="/logo/polkadot.png"
            alt="学校 Logo"
            width={100}
            height={100}
          />
        </Link>
        <div className="flex-grow">
          {/* 移动端的导航按钮 */}
          <button
            className="px-4 py-2 text-gray-800 md:hidden"
            onClick={() =>
              setIsNavOpen(!isNavOpen)
            }
          >
            导航栏
            <svg
              className={`ml-2 inline-block h-4 w-4 transform transition-transform ${isNavOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* 导航链接 */}
          <div
            className={`md:flex md:items-center md:border-l ${isNavOpen ? 'grid grid-cols-3' : 'hidden'} absolute left-0 right-0 z-50 mx-4 mt-2  rounded-lg border border-gray-200/50 bg-white/80 shadow-lg backdrop-blur-md transition-all duration-200 ease-in-out md:relative md:mx-0 md:mt-0 md:divide-x-0 md:border-none md:bg-transparent md:shadow-none`}
          >
            <Link
              href="/news"
              className={` border md:border-l px-4 py-2 text-center text-gray-800 hover:bg-gray-200/50 hover:text-blue-500 md:text-left md:hover:bg-transparent ${pathname === '/news' ? 'text-blue-500' : ''}`}
              onClick={() => setIsNavOpen(false)}
            >
              校内新闻
            </Link>
            <Link
              href="/notice"
              className={`border px-4 py-2 text-center text-gray-800 hover:bg-gray-200/50 hover:text-blue-500 md:text-left md:hover:bg-transparent ${pathname === '/notice' ? 'text-blue-500' : ''}`}
              onClick={() => setIsNavOpen(false)}
            >
              学校公告
            </Link>
            <Link
              href="/forum"
              className={`border px-4 py-2 text-center text-gray-800 hover:bg-gray-200/50 hover:text-blue-500 md:text-left md:hover:bg-transparent ${pathname === '/forum' ? 'text-blue-500' : ''}`}
              onClick={() => setIsNavOpen(false)}
            >
              教育论坛
            </Link>
            <Link
              href="/resource"
              className={`border px-4 py-2 text-center text-gray-800 hover:bg-gray-200/50 hover:text-blue-500 md:text-left md:hover:bg-transparent ${pathname === '/resource' ? 'text-blue-500' : ''}`}
              onClick={() => setIsNavOpen(false)}
            >
              教育资源
            </Link>
            <Link
              href="/dynamic"
              className={`border px-4 py-2 text-center text-gray-800 hover:bg-gray-200/50 hover:text-blue-500 md:text-left md:hover:bg-transparent ${pathname === '/dynamic' ? 'text-blue-500' : ''}`}
              onClick={() => setIsNavOpen(false)}
            >
              教学动态
            </Link>
          </div>
        </div>
      </div>
      {/* 右侧导航栏 */}
      {session ? (
        <div className="relative flex items-center">
          <div className="user-menu-container mx-4 my-3">
            <button
              className="flex items-center space-x-2 rounded-full bg-white p-1 shadow-md hover:ring-2 hover:ring-pink-600"
              onClick={() =>
                setIsMenuOpen(!isMenuOpen)
              }
            >
              <Image
                src={
                  session.user?.image ??
                  '/default-avatar.png'
                }
                alt="用户头像"
                width={40}
                height={40}
                className="rounded-full"
              />
            </button>
            {/* 下拉菜单 */}
            <div
              className={`absolute right-1 mt-2 w-auto flex-1 rounded-lg bg-white py-2 shadow-xl ${isMenuOpen ? 'block' : 'hidden'}`}
            >
              <Link
                href="/dashboard"
                className="block px-1 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() =>
                  setIsMenuOpen(false)
                }
              >
                用户中心
              </Link>
              <Link
                href="/logout"
                className="block px-1 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() =>
                  setIsMenuOpen(false)
                }
              >
                退出登录
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Link
          href="/login"
          className={`hover:bg--700 mx-4 my-3 flex items-center justify-center rounded-full bg-white px-4 py-2 text-black shadow-md hover:text-pink-600 ${pathname === '/login' ? 'text-blue-500' : ''}`}
        >
          登录
        </Link>
      )}
    </div>
  );
}
