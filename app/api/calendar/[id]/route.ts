import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { id } = params;

    const updatedEvent = await prisma.calendarEvent.update({
      where: { id },
      data: {
        title: body.title,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        color: body.color || 'blue',
        userId: body.userId || 'anonymous',
        trainingPlan: body.trainingPlan ? {
          create: {
            userId: body.userId || 'anonymous',
            title: body.trainingPlan.title,
            description: body.trainingPlan.description,
            duration: body.trainingPlan.duration,
            difficulty: body.trainingPlan.difficulty,
            exercises: body.trainingPlan.exercises || []
          }
        } : undefined
      },
      include: {
        trainingPlan: true
      }
    });
    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.calendarEvent.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
} 