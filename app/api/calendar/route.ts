import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { z } from 'zod';
import type { CalendarEvent } from '../../../prisma/generated/client';

// Validation schema for calendar events
const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  startDate: z.string().transform((str: string) => new Date(str)),
  endDate: z.string().transform((str: string) => new Date(str)),
  allDay: z.boolean().optional(),
  location: z.string().optional(),
  color: z.string().optional(),
  isRecurring: z.boolean().optional(),
  recurrenceRule: z.string().optional(),
  reminderBefore: z.number().optional(),
});

// GET /api/calendar
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const start = searchParams.get('start');
    const end = searchParams.get('end');

    const events = await prisma.calendarEvent.findMany({
      where: {
        userId: session.user.id,
        AND: [
          start ? { startDate: { gte: new Date(start) } } : {},
          end ? { endDate: { lte: new Date(end) } } : {},
        ],
      },
      include: {
        attachments: true,
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST /api/calendar
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = eventSchema.parse(body);

    const event = await prisma.calendarEvent.create({
      data: {
        ...validatedData,
        userId: session.user.id,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid event data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating calendar event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}

// PUT /api/calendar
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('id');
    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validatedData = eventSchema.parse(body);

    const event = await prisma.calendarEvent.update({
      where: {
        id: eventId,
        userId: session.user.id,
      },
      data: validatedData,
    });

    return NextResponse.json(event);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid event data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error updating calendar event:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

// DELETE /api/calendar
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('id');
    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    await prisma.calendarEvent.delete({
      where: {
        id: eventId,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting calendar event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
} 