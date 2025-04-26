import { format, isSameDay, isToday } from 'date-fns';
import { useCalendar } from '@/app/contexts/CalendarContext';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function WeekView() {
  const { currentDate, getDaysInWeek, getEventsForDate } = useCalendar();
  const days = getDaysInWeek();

  return (
    <div className="flex h-full">
      {/* Time labels */}
      <div className="w-16 border-r">
        <div className="h-12 border-b" /> {/* Header spacer */}
        <ScrollArea className="h-[calc(100vh-12rem)]">
          {HOURS.map((hour) => (
            <div
              key={hour}
              className="h-12 border-b text-xs text-right pr-2 text-muted-foreground"
            >
              {format(new Date().setHours(hour), 'HH:mm')}
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Days */}
      <div className="flex-1 grid grid-cols-7">
        {/* Day headers */}
        {days.map((date) => (
          <div
            key={date.toISOString()}
            className={cn(
              'h-12 border-b border-r p-2 text-center',
              isToday(date) && 'bg-primary/5'
            )}
          >
            <div className="text-sm font-medium">
              {format(date, 'EEE')}
            </div>
            <div
              className={cn(
                'text-sm',
                isToday(date) && 'text-primary font-medium'
              )}
            >
              {format(date, 'd')}
            </div>
          </div>
        ))}

        {/* Time grid */}
        {days.map((date) => (
          <div key={date.toISOString()} className="relative">
            <ScrollArea className="h-[calc(100vh-12rem)]">
              {HOURS.map((hour) => {
                const events = getEventsForDate(date).filter(event => {
                  const eventDate = new Date(event.startDate);
                  return eventDate.getHours() === hour;
                });

                return (
                  <div
                    key={hour}
                    className={cn(
                      'h-12 border-b border-r p-1',
                      isToday(date) && 'bg-primary/5'
                    )}
                  >
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className={cn(
                          'text-xs p-1 rounded truncate',
                          'bg-primary/10 border border-primary/20'
                        )}
                        style={{
                          backgroundColor: event.color ? `var(--${event.color})` : undefined
                        }}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </ScrollArea>
          </div>
        ))}
      </div>
    </div>
  );
} 