import '@/styles/globals.css';

import { type Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { SessionProvider } from 'next-auth/react';

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
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
    >
      <body className="bg-gradient-to-b from-[#adff73] to-[#e9eaff] text-white">
        {/* <Navbar2 session={session} /> */}
        {/* 在根layout中使用session 传递到组件中，就不会有先加载组件，再调整状态时产生的闪烁问题了 */}
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
