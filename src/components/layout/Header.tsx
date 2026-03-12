import type { ReactNode } from 'react';
import { format } from 'date-fns';

interface HeaderProps {
  title: string;
  children?: ReactNode;
}

export default function Header({ title, children }: HeaderProps) {
  return (
    <header className="flex items-center justify-between pb-4 mb-6 border-b border-cream/8">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl text-cream tracking-wide">
          {title}
        </h1>
        <p className="text-cream/40 text-sm mt-0.5">
          {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </p>
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </header>
  );
}
