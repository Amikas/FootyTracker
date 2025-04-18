import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface GoalInput {
  userId: string;
  title: string;
  type: 'weekly' | 'monthly';
  target: number;
  unit: string;
  endDate: Date;
}

interface GoalUpdateInput {
  progress?: number;
  completed?: boolean;
}

// GET all goals
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const goals = await prisma.goal.findMany({
      where: {
        userId,
        ...(type && { type }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(goals);
  } catch (error) {
    console.error('Error fetching goals:', error);
    return NextResponse.json({ error: 'Failed to fetch goals' }, { status: 500 });
  }
}

// POST new goal
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, title, type, target, unit, endDate } = body;

    if (!userId || !title || !type || !target || !unit || !endDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // @ts-ignore - Ignoring type checking for now until Prisma types are fixed
    const goal = await prisma.goal.create({
      data: {
        userId,
        title,
        type,
        target: Number(target),
        unit,
        endDate: new Date(endDate),
      },
    });

    return NextResponse.json(goal);
  } catch (error) {
    console.error('Error creating goal:', error);
    return NextResponse.json({ error: 'Failed to create goal' }, { status: 500 });
  }
}

// PATCH update goal progress
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, progress, completed } = body;

    if (!id) {
      return NextResponse.json({ error: 'Goal ID is required' }, { status: 400 });
    }

    const updateData: any = {};
    if (typeof progress === 'number') updateData.progress = progress;
    if (typeof completed === 'boolean') updateData.completed = completed;

    // @ts-ignore - Ignoring type checking for now until Prisma types are fixed
    const goal = await prisma.goal.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(goal);
  } catch (error) {
    console.error('Error updating goal:', error);
    return NextResponse.json({ error: 'Failed to update goal' }, { status: 500 });
  }
}

// DELETE goal
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Goal ID is required' }, { status: 400 });
    }

    // @ts-ignore - Ignoring type checking for now until Prisma types are fixed
    await prisma.goal.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error('Error deleting goal:', error);
    return NextResponse.json({ error: 'Failed to delete goal' }, { status: 500 });
  }
}
