'use client';
import Navbar2 from '@/app/components/Navbar2';
import Main from '@/app/components/Main';
import Footer from '@/app/components/Footer';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function Home() {
  const [showNavbar, setShowNavbar] =
    useState(true);
  const [lastScrollY, setLastScrollY] =
    useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY === 0) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener(
      'scroll',
      controlNavbar,
    );

    return () => {
      window.removeEventListener(
        'scroll',
        controlNavbar,
      );
    };
  }, []);
  const session = useSession();
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#adff73] to-[#e9eaff] text-white">
      <div
        className={`transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <Navbar2 session={session.data} />
      </div>
      <Main />
      <Footer />
    </div>
  );
}
