import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-sacred-950">
      <div className="blob-bg blob-1" />
      <div className="blob-bg blob-2" />

      <Sidebar />
      <MobileNav />

      <main className="relative z-10 md:ml-[240px] pb-20 md:pb-8 px-4 md:px-8 pt-6">
        {children}
      </main>
    </div>
  );
}
