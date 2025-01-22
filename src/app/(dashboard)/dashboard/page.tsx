// 在dashboard中，静态的页面使用server component，动态的页面使用client component
//在dashboard中，把动态的页面摘出来放到components中，使用组件的方式添加到静态页面中来
//在（dashboard）中的components文件不参与路由，与根components文件不冲突
import { redirect } from 'next/navigation';
import { auth } from '@/server/auth';
import PostsNumber from '../components/postsNumber';
import UserStatus from '../components/userStatus';
import RecentActivity from '../components/recentActivity';
import { Suspense } from 'react';

export default async function DashboardPage() {
  const session = await auth();

  // 如果未登录，重定向到首页
  if (!session?.user) {
    redirect('/login');
  }
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="container mx-auto px-4 py-8">
        {/* 欢迎区域 */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800">
            欢迎回来, {session.user.name}
          </h1>
          <p className="text-gray-600">这是您的个人仪表盘</p>
        </div>

        {/* 数据卡片区域 */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <RecentActivity />
          <UserStatus />
          <PostsNumber />
        </div>
      </div>
    </main>
  );
}
