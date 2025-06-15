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
import { useCalendar } from '@/components/ui/customcalendar';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { format, isSameDay, isSameMonth, isToday } from 'date-fns';

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
  trainingPlan?: {
    id?: string;
    title: string;
    description?: string;
    duration: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    exercises: any[];
  };
}

// Update the form state type at the top of the file
interface FormState {
  title: string;
  start: string;
  end: string;
  color: NonNullable<EventColor>;
  trainingPlan: {
    id?: string;
    title: string;
    description: string;
    duration: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    exercises: any[];
  };
}

// Add this component for displaying training plan details
const TrainingPlanDetails = ({ trainingPlan }: { trainingPlan: any }) => {
  if (!trainingPlan) return null;

  return (
    <div className="mt-2 text-xs space-y-1">
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="font-medium">{trainingPlan.title}</span>
      </div>
      <div className="text-muted-foreground">
        <div>Difficulty: {trainingPlan.difficulty}</div>
        <div>Duration: {trainingPlan.duration} mins</div>
      </div>
    </div>
  );
};

// Update the dialog content to show existing training plan details when editing
export default function CalendarPage() {
  const [events, setEvents] = useState<StoredEvent[]>([]);
  const [showTrainingPlan, setShowTrainingPlan] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<StoredEvent | null>(null);
  const [form, setForm] = useState<FormState>({
    title: '',
    start: formatISO(new Date()),
    end: formatISO(new Date()),
    color: 'blue',
    trainingPlan: {
      title: '',
      description: '',
      duration: 60,
      difficulty: 'Medium',
      exercises: []
    }
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
          trainingPlan: event.trainingPlan ? {
            id: event.trainingPlan.id,
            title: event.trainingPlan.title,
            description: event.trainingPlan.description || '',
            duration: event.trainingPlan.duration,
            difficulty: event.trainingPlan.difficulty,
            exercises: event.trainingPlan.exercises || []
          } : undefined
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
      trainingPlan: event.trainingPlan ? {
        id: event.trainingPlan.id,
        title: event.trainingPlan.title,
        description: event.trainingPlan.description || '',
        duration: event.trainingPlan.duration,
        difficulty: event.trainingPlan.difficulty,
        exercises: event.trainingPlan.exercises || []
      } : undefined
    };
    setSelectedEvent(storedEvent);
    setForm({
      title: event.title,
      start: formatISO(event.start),
      end: formatISO(event.end),
      color: event.color || 'blue',
      trainingPlan: event.trainingPlan ? {
        id: event.trainingPlan.id,
        title: event.trainingPlan.title,
        description: event.trainingPlan.description || '',
        duration: event.trainingPlan.duration,
        difficulty: event.trainingPlan.difficulty,
        exercises: event.trainingPlan.exercises || []
      } : {
        title: '',
        description: '',
        duration: 60,
        difficulty: 'Medium',
        exercises: []
      }
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
      trainingPlan: {
        title: '',
        description: '',
        duration: 60,
        difficulty: 'Medium',
        exercises: []
      }
    });
  };

  const handleSubmit = async () => {
    const payload = {
      title: form.title,
      startDate: form.start,
      endDate: form.end,
      color: form.color,
      userId: 'anonymous', // Replace with real auth if needed
      trainingPlan: form.trainingPlan.title ? {
        title: form.trainingPlan.title,
        description: form.trainingPlan.description,
        duration: form.trainingPlan.duration,
        difficulty: form.trainingPlan.difficulty,
        exercises: form.trainingPlan.exercises
      } : undefined
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
    const newEvent = {
      id: saved.id || selectedEvent?.id || uuidv4(),
      title: saved.title,
      startDate: saved.startDate,
      endDate: saved.endDate,
      color: saved.color || 'blue',
      userId: saved.userId,
      trainingPlan: saved.trainingPlan
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
              if (!isOpen) {
                resetForm();
                setShowTrainingPlan(false); // Reset visibility state
              }
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
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="start">Start</Label>
                    <Input
                      id="start"
                      type="datetime-local"
                      value={form.start.slice(0, 16)}
                      onChange={(e) => setForm({ ...form, start: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end">End</Label>
                    <Input
                      id="end"
                      type="datetime-local"
                      value={form.end.slice(0, 16)}
                      onChange={(e) => setForm({ ...form, end: e.target.value })}
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

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setShowTrainingPlan(!showTrainingPlan)}
                          className="font-medium text-primary hover:text-primary/80 transition-colors duration-200 px-2 py-1 rounded-md cursor-pointer flex items-center gap-1"
                      >
                        {showTrainingPlan ? 'Hide' : 'Show'} Training Plan Details
                      </button>
                      {selectedEvent?.trainingPlan && (
                        <div className="text-sm text-muted-foreground">
                          Current Plan: {selectedEvent.trainingPlan.title}
                        </div>
                      )}
                    </div>

                    {showTrainingPlan && (
                      <>
                        <div>
                          <Label htmlFor="training-title">Training Plan Title</Label>
                          <Input
                            id="training-title"
                            value={form.trainingPlan.title}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                trainingPlan: { ...form.trainingPlan, title: e.target.value }
                              })
                            }
                            placeholder="e.g., High Intensity Interval Training"
                          />
                        </div>
                        <div>
                          <Label htmlFor="training-description">Description</Label>
                          <Input
                            id="training-description"
                            value={form.trainingPlan.description}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                trainingPlan: { ...form.trainingPlan, description: e.target.value }
                              })
                            }
                            placeholder="Brief description of the training plan"
                          />
                        </div>
                        <div>
                          <Label htmlFor="training-duration">Duration (minutes)</Label>
                          <Input
                            id="training-duration"
                            type="number"
                            min="1"
                            value={form.trainingPlan.duration}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                trainingPlan: {
                                  ...form.trainingPlan,
                                  duration: parseInt(e.target.value) || 60
                                }
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="training-difficulty">Difficulty</Label>
                          <Select
                            value={form.trainingPlan.difficulty}
                            onValueChange={(value: 'Easy' | 'Medium' | 'Hard') =>
                              setForm({
                                ...form,
                                trainingPlan: { ...form.trainingPlan, difficulty: value }
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Easy">Easy</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
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
