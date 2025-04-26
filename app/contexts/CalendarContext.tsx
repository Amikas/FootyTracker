"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay, addMonths } from 'date-fns';
import { CalendarEvent } from '@/app/types/calendar';

type ViewType = 'month' | 'week' | 'day';

interface CalendarContextType {
  currentDate: Date;
  view: ViewType;
  events: CalendarEvent[];
  isLoading: boolean;
  setCurrentDate: (date: Date) => void;
  setView: (view: ViewType) => void;
  setEvents: (events: CalendarEvent[]) => void;
  getDaysInMonth: () => Date[];
  getDaysInWeek: () => Date[];
  getEventsForDate: (date: Date) => CalendarEvent[];
  nextPeriod: () => void;
  prevPeriod: () => void;
  setIsLoading: (loading: boolean) => void;
}

export const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>('month');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDaysInMonth = useCallback(() => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  const getDaysInWeek = useCallback(() => {
    const start = startOfWeek(currentDate);
    const end = endOfWeek(currentDate);
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  const getEventsForDate = useCallback((date: Date) => {
    return events.filter(event => {
      const eventStart = new Date(event.startDate);
      return isSameDay(eventStart, date);
    });
  }, [events]);

  const nextPeriod = useCallback(() => {
    setCurrentDate(prev => {
      switch (view) {
        case 'month':
          return addMonths(prev, 1);
        case 'week':
          return addMonths(prev, 1);
        case 'day':
          return addMonths(prev, 1);
        default:
          return prev;
      }
    });
  }, [view]);

  const prevPeriod = useCallback(() => {
    setCurrentDate(prev => {
      switch (view) {
        case 'month':
          return addMonths(prev, -1);
        case 'week':
          return addMonths(prev, -1);
        case 'day':
          return addMonths(prev, -1);
        default:
          return prev;
      }
    });
  }, [view]);

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        view,
        events,
        isLoading,
        setCurrentDate,
        setView,
        setEvents,
        getDaysInMonth,
        getDaysInWeek,
        getEventsForDate,
        nextPeriod,
        prevPeriod,
        setIsLoading,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
} 