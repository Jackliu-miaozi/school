import '@/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { TRPCReactProvider } from '@/trpc/react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import darkTheme from '@/theme/darkTheme';
import defaultTheme from '@/theme/themeConfig';
import Navbar from '@/app/components/Navbar';
import { auth } from '@/server/auth';

export const metadata: Metadata = {
  title: '青州一中',
  description: '青州一中',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDarkMode = 0;
  const session = await auth();
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <SessionProvider session={session}>
          <TRPCReactProvider>
            <AntdRegistry>
              <ConfigProvider theme={isDarkMode ? darkTheme : defaultTheme}>
                <div className="flex min-h-screen flex-col">
                  {/* 在根layout中使用session 传递到组件中，就不会有先加载组件，再调整状态时产生的闪烁问题了 */}
                  <Navbar />
                  <main className="flex-grow">{children}</main>
                </div>
              </ConfigProvider>
            </AntdRegistry>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
