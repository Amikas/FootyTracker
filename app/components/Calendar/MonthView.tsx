import { format, isSameMonth, isToday } from 'date-fns';
import { useCalendar } from '@/app/contexts/CalendarContext';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { CalendarEvent } from '@/app/types/calendar';

export default function MonthView() {
  const { currentDate, getDaysInMonth, getEventsForDate } = useCalendar();

  const days = getDaysInMonth();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="grid grid-cols-7 h-full border-l border-t">
      {weekDays.map((day) => (
        <div
          key={day}
          className="p-2 text-sm font-medium text-center border-b border-r bg-muted"
        >
          {day}
        </div>
      ))}

      {days.map((date, index) => {
        const dayEvents = getEventsForDate(date);
        const isCurrentMonth = isSameMonth(date, currentDate);

        return (
          <div
            key={date.toISOString()}
            className={cn(
              'min-h-[120px] p-2 border-b border-r relative',
              !isCurrentMonth && 'bg-muted/50'
            )}
          >
            <div
              className={cn(
                'text-sm font-medium',
                !isCurrentMonth && 'text-muted-foreground',
                isToday(date) && 'text-primary'
              )}
            >
              {format(date, 'd')}
            </div>

            <ScrollArea className="h-[80px] mt-1">
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className="mb-1"
                >
                  <Badge
                    variant="outline"
                    className={cn(
                      'w-full truncate text-xs justify-start',
                      event.color && `bg-${event.color}-100 border-${event.color}-200`
                    )}
                  >
                    {format(new Date(event.startDate), 'HH:mm')} {event.title}
                  </Badge>
                </div>
              ))}
            </ScrollArea>
          </div>
        );
      })}
    </div>
  );
} 