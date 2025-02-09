'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';
export default function SignOutPage() {
  const [isLoading, setIsLoading] =
    useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white/10 p-6 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            退出登录
          </h2>
          <p className="mt-4 text-lg">
            确定要退出登录吗？
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="rounded-md bg-gray-600 px-6 py-2 text-white hover:bg-gray-500"
          >
            取消
          </button>
          <button
            onClick={handleSignOut}
            disabled={isLoading}
            className="rounded-md bg-red-600 px-6 py-2 text-white hover:bg-red-500 disabled:opacity-50"
          >
            {isLoading ? '退出中...' : '确认退出'}
          </button>
        </div>
      </div>
    </div>
  );
}
