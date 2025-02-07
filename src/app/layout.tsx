import '@/styles/globals.css';

import { type Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';

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
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <div className="flex min-h-screen flex-col">
          {/* 在根layout中使用session 传递到组件中，就不会有先加载组件，再调整状态时产生的闪烁问题了 */}
          <main className="flex-grow">{children}</main>
        </div>
      </body>
    </html>
  );
}
