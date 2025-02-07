import { auth } from '@/server/auth';
import Navbar from './components/Navbar';

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <Navbar session={session} />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session && <span>欢迎回来，{session.user?.name}</span>}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
