// app/api/calendar-events/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const events = await prisma.calendarEvent.findMany({
      orderBy: { startDate: 'asc' },
    });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newEvent = await prisma.calendarEvent.create({
      data: {
        title: body.title,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        color: body.color || 'blue',
        userId: body.userId || 'anonymous', // You can change this once you have auth
      },
    });

    return NextResponse.json(newEvent);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
