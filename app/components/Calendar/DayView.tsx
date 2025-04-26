import { format } from 'date-fns';
import { useCalendar } from '@/app/contexts/CalendarContext';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function DayView() {
  const { currentDate, getEventsForDate } = useCalendar();
  const events = getEventsForDate(currentDate);

  return (
    <div className="flex h-full">
      {/* Time labels */}
      <div className="w-16 border-r">
        <div className="h-12 border-b" /> {/* Header spacer */}
        <ScrollArea className="h-[calc(100vh-12rem)]">
          {HOURS.map((hour) => (
            <div
              key={hour}
              className="h-16 border-b text-xs text-right pr-2 text-muted-foreground"
            >
              {format(new Date().setHours(hour), 'HH:mm')}
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Events */}
      <div className="flex-1">
        <div className="h-12 border-b p-2">
          <div className="text-sm font-medium">
            {format(currentDate, 'EEEE')}
          </div>
          <div className="text-sm text-muted-foreground">
            {format(currentDate, 'MMMM d, yyyy')}
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-12rem)]">
          {HOURS.map((hour) => {
            const hourEvents = events.filter(event => {
              const eventDate = new Date(event.startDate);
              return eventDate.getHours() === hour;
            });

            return (
              <div
                key={hour}
                className="h-16 border-b p-1 relative"
              >
                {hourEvents.map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      'absolute left-1 right-1',
                      'text-sm p-1 rounded',
                      'bg-primary/10 border border-primary/20'
                    )}
                    style={{
                      backgroundColor: event.color ? `var(--${event.color})` : undefined,
                      top: `${(new Date(event.startDate).getMinutes() / 60) * 100}%`,
                      height: '2rem'
                    }}
                  >
                    <div className="font-medium truncate">
                      {event.title}
                    </div>
                    {event.location && (
                      <div className="text-xs text-muted-foreground truncate">
                        {event.location}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </ScrollArea>
      </div>
    </div>
  );
} 