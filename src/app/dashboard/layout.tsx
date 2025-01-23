
import '@/styles/globals.css';
import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { TRPCReactProvider } from '@/trpc/react';
import { ConfigProvider } from 'antd';
import darkTheme from '@/theme/darkTheme';
import defaultTheme from '@/theme/themeConfig';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard description',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDarkMode = true;
  return (
    <html lang="zh" className={GeistSans.variable}>
      <body>
        <ConfigProvider theme={isDarkMode ? darkTheme : defaultTheme}>
          <SessionProvider>
            <TRPCReactProvider>
              {children}
            </TRPCReactProvider>
          </SessionProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
