'use client';

import { useEffect, useState } from 'react';
import {
  Calendar,
  CalendarViewTrigger,
  CalendarDayView,
  CalendarWeekView,
  CalendarMonthView,
  CalendarYearView,
  CalendarCurrentDate,
  CalendarPrevTrigger,
  CalendarNextTrigger,
  CalendarTodayTrigger,
  CalendarEvent as CustomCalendarEvent,
} from '@/components/ui/customcalendar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { formatISO } from 'date-fns';
import Link from 'next/link';

// The color type from the custom calendar component
type EventColor = CustomCalendarEvent['color'];

// Our internal event type that includes additional fields needed for the backend
interface StoredEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  color: NonNullable<EventColor>;
  userId?: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<StoredEvent[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<StoredEvent | null>(null);
  const [form, setForm] = useState({
    title: '',
    start: formatISO(new Date()),
    end: formatISO(new Date()),
    color: 'blue' as NonNullable<EventColor>,
  });

  // Load events from MongoDB on mount
  useEffect(() => {
    fetch('/api/calendar')
      .then((res) => res.json())
      .then((data) => {
        // Convert and validate incoming data
        const parsed = data.map((event: any) => ({
          id: event.id || uuidv4(),
          title: event.title,
          startDate: event.startDate,
          endDate: event.endDate,
          color: event.color || 'blue',
          userId: event.userId,
        }));
        setEvents(parsed);
      });
  }, []);

  const handleEventClick = (event: CustomCalendarEvent) => {
    const storedEvent: StoredEvent = {
      id: event.id,
      title: event.title,
      startDate: formatISO(event.start),
      endDate: formatISO(event.end),
      color: event.color || 'blue',
    };
    setSelectedEvent(storedEvent);
    setForm({
      title: event.title,
      start: formatISO(event.start),
      end: formatISO(event.end),
      color: event.color || 'blue',
    });
    setOpen(true);
  };

  const resetForm = () => {
    setSelectedEvent(null);
    setForm({
      title: '',
      start: formatISO(new Date()),
      end: formatISO(new Date()),
      color: 'blue',
    });
  };

  const handleSubmit = async () => {
    const payload = {
      title: form.title,
      startDate: form.start,
      endDate: form.end,
      color: form.color,
      userId: 'anonymous', // Replace with real auth if needed
    };

    const method = selectedEvent ? 'PUT' : 'POST';
    const url = selectedEvent 
      ? `/api/calendar/${selectedEvent.id}` 
      : '/api/calendar';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error('Failed to save event');
      return;
    }

    const saved = await res.json();

    // Update local state
    const newEvent: StoredEvent = {
      id: saved.id || selectedEvent?.id || uuidv4(),
      title: saved.title,
      startDate: saved.startDate,
      endDate: saved.endDate,
      color: saved.color || 'blue',
      userId: saved.userId,
    };

    if (selectedEvent) {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === selectedEvent.id ? newEvent : event
        )
      );
    } else {
      setEvents((prev) => [...prev, newEvent]);
    }

    resetForm();
    setOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;

    const res = await fetch(`/api/calendar/${selectedEvent.id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      console.error('Failed to delete event');
      return;
    }

    setEvents((prev) => prev.filter((event) => event.id !== selectedEvent.id));
    resetForm();
    setOpen(false);
  };

  // Convert our stored events to the format expected by the calendar component
  const calendarEvents: CustomCalendarEvent[] = events.map(event => ({
    id: event.id,
    title: event.title,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    color: event.color,
  }));

  return (
    <>
      <div className="flex justify-between p-4">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
      <Calendar 
        events={calendarEvents} 
        onEventClick={handleEventClick}
        setEvents={(newEvents) => {
          // Convert calendar events back to our stored format
          setEvents(newEvents.map(event => ({
            id: event.id,
            title: event.title,
            startDate: formatISO(event.start),
            endDate: formatISO(event.end),
            color: event.color || 'blue',
          })));
        }}
      >
        <div className="h-dvh py-6 flex flex-col">
          {/* View Switchers */}
          <div className="flex px-6 items-center gap-2 mb-6">
            <CalendarViewTrigger
              className="aria-[current=true]:bg-accent"
              view="day"
            >
              Day
            </CalendarViewTrigger>
            <CalendarViewTrigger
              view="week"
              className="aria-[current=true]:bg-accent"
            >
              Week
            </CalendarViewTrigger>
            <CalendarViewTrigger
              view="month"
              className="aria-[current=true]:bg-accent"
            >
              Month
            </CalendarViewTrigger>
            <CalendarViewTrigger
              view="year"
              className="aria-[current=true]:bg-accent"
            >
              Year
            </CalendarViewTrigger>

            <span className="flex-1" />

            <CalendarCurrentDate />

            <CalendarPrevTrigger>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </CalendarPrevTrigger>

            <CalendarTodayTrigger>Today</CalendarTodayTrigger>

            <CalendarNextTrigger>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </CalendarNextTrigger>
          </div>

          {/* Add + Remove */}
          <div className="px-6 flex gap-2 mb-4">
            <Dialog open={open} onOpenChange={(isOpen) => {
              if (!isOpen) resetForm();
              setOpen(isOpen);
            }}>
              <DialogTrigger asChild>
                <Button>Add Event</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {selectedEvent ? 'Edit Event' : 'Create Event'}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="start">Start</Label>
                    <Input
                      id="start"
                      type="datetime-local"
                      value={form.start.slice(0, 16)}
                      onChange={(e) =>
                        setForm({ ...form, start: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="end">End</Label>
                    <Input
                      id="end"
                      type="datetime-local"
                      value={form.end.slice(0, 16)}
                      onChange={(e) =>
                        setForm({ ...form, end: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Select
                      value={form.color}
                      onValueChange={(value: NonNullable<EventColor>) =>
                        setForm({ ...form, color: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="pink">Pink</SelectItem>
                        <SelectItem value="purple">Purple</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter className="flex justify-between">
                  {selectedEvent && (
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                      type="button"
                    >
                      Delete
                    </Button>
                  )}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        resetForm();
                        setOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit}>
                      {selectedEvent ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Views */}
          <div className="flex-1 overflow-auto px-6 relative">
            <CalendarDayView />
            <CalendarWeekView />
            <CalendarMonthView />
            <CalendarYearView />
          </div>
        </div>
      </Calendar>
    </>
  );
}
