import '@/styles/globals.css';
import { auth } from '@/server/auth';
import { SessionProvider } from 'next-auth/react';
import { redirect } from 'next/navigation';
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect('/login')
  }
  return <SessionProvider session={session}>{children}</SessionProvider>;
  //children本身并不接受参数
  //所以 children 本身并不直接接收 session，而是通过 Context API 的方式来访问 session 数据。
  //SessionProvider 的作用是创建一个上下文，使得所有子组件都能访问到 session 信息
  //children可以使用useSession来获取这个上下文信息，也就是说children只能是静态的了。
  //如果需要动态的页面，需要使用client component
  //在dashboard中，静态的页面使用server component，动态的页面使用client component
}
