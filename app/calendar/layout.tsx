import { ReactNode } from 'react';

export default function CalendarLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      {children}
    </div>
  );
} 