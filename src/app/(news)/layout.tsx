import '@/styles/globals.css';
import { auth } from '@/server/auth';
import Navbar2 from '@/app/components/Navbar2';
import Footer from "@/app/components/Footer";

import { type Metadata } from 'next';
import { TRPCReactProvider } from '@/trpc/react';

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
  const session = await auth();
  return (
    <>
      <TRPCReactProvider>
        <Navbar2 session={session} />
        <div className="flex min-h-screen flex-col">
          {/* 在根layout中使用session 传递到组件中，就不会有先加载组件，再调整状态时产生的闪烁问题了 */}
          <main className="flex-grow">
            {children}
          </main>
          <Footer />  
        </div>
      </TRPCReactProvider>
    </>
  );
}
