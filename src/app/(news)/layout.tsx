import type { ReactNode } from 'react';

interface NewsLayoutProps {
  children: ReactNode;
}

export default function NewsLayout({ children }: NewsLayoutProps) {
  return <div>{children}</div>;
}
