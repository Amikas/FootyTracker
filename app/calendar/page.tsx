import { Metadata } from 'next';
import Calendar from '@/app/components/Calendar/Calendar';
import { CalendarProvider } from '@/app/contexts/CalendarContext';

export const metadata: Metadata = {
  title: 'Calendar | FootyTracker',
  description: 'Manage your training schedule and events',
};

export default function CalendarPage() {
  return (
    <div className="container py-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">
            Manage your training schedule and track your events
          </p>
        </div>
        <div className="h-[calc(100vh-12rem)]">
          <CalendarProvider>
            <Calendar />
          </CalendarProvider>
        </div>
      </div>
    </div>
  );
} 