"use client";
import { useState } from 'react';
import { useCalendar } from '@/app/contexts/CalendarContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';

type ViewType = 'month' | 'week' | 'day';

export default function Calendar() {
  const [view, setView] = useState<ViewType>('month');
  const { currentDate, setCurrentDate } = useCalendar();

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateDate('prev')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateDate('next')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">
            {currentDate.toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
              ...(view !== 'month' && { day: 'numeric' })
            })}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Select value={view} onValueChange={(value: ViewType) => setView(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        {view === 'month' && <MonthView />}
        {view === 'week' && <WeekView />}
        {view === 'day' && <DayView />}
      </div>
    </div>
  );
} 