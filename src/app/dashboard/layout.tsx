import '@/styles/globals.css';
import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { TRPCReactProvider } from '@/trpc/react';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard description',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className={GeistSans.variable}>
      <body>
        <SessionProvider>
          <TRPCReactProvider>
            <div className="dashboard-layout">
              {/* Dashboard 特定的导航或侧边栏 */}
              <aside className="dashboard-sidebar">
                {/* 侧边栏内容 */}
              </aside>
              
              <main className="dashboard-main">
                {children}
              </main>
            </div>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
} 