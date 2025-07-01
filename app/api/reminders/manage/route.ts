import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ReminderCategory } from "@prisma/client";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const reminders = await prisma.reminder.findMany({
      where: {
        userId: session.user.id,
        isCompleted: false,
      },
      orderBy: [
        {
          isRecurring: 'asc',
        },
        {
          date: 'asc',
        },
      ],
    });

    // Process recurring reminders
    const processedReminders = reminders.map(reminder => {
      if (!reminder.isRecurring || !reminder.lastTriggered) {
        return reminder;
      }

      const now = new Date();
      const lastTriggered = new Date(reminder.lastTriggered);
      let nextDate = new Date(reminder.date);

      switch (reminder.frequency) {
        case 'daily':
          // Set to next day if already triggered today
          if (lastTriggered.toDateString() === now.toDateString()) {
            nextDate.setDate(nextDate.getDate() + 1);
          }
          break;
        case 'weekly':
          // Set to next week if already triggered this week
          if (lastTriggered > now.setDate(now.getDate() - 7)) {
            nextDate.setDate(nextDate.getDate() + 7);
          }
          break;
        case 'monthly':
          // Set to next month if already triggered this month
          if (lastTriggered.getMonth() === now.getMonth()) {
            nextDate.setMonth(nextDate.getMonth() + 1);
          }
          break;
      }

      return {
        ...reminder,
        date: nextDate,
      };
    });

    return NextResponse.json(processedReminders);
  } catch (error) {
    console.error("[REMINDERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, category, date, isRecurring, frequency } = body;

    if (!title || !category || !date) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    if (isRecurring && !frequency) {
      return new NextResponse("Frequency is required for recurring reminders", { status: 400 });
    }

    if (!Object.values(ReminderCategory).includes(category)) {
      return new NextResponse("Invalid category", { status: 400 });
    }

    const reminder = await prisma.reminder.create({
      data: {
        title,
        category,
        date: new Date(date),
        isRecurring,
        frequency: isRecurring ? frequency : null,
        userId: session.user.id,
      },
    });

    return NextResponse.json(reminder);
  } catch (error) {
    console.error("[REMINDERS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
