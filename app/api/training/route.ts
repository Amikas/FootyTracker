import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  try {
    if (type === "exercises") {
      const exercises = await prisma.exercise.findMany();
      return NextResponse.json({ success: true, data: exercises });
    }

    const sessions = await prisma.trainingSession.findMany({
      where: { userId: session.user.id },
      orderBy: { date: "desc" },
      include: {
        sets: {
          include: { exercise: true },
        },
      },
    });

    return NextResponse.json({ success: true, data: sessions });
  } catch (err) {
    console.error("GET /api/training error:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { date, sets, title, notes } = body;

    const sessionRecord = await prisma.trainingSession.create({
      data: {
        userId: session.user.id,
        date: new Date(date),
        title,
        notes,
        sets: {
          create: sets.map((set: any) => ({
            exerciseId: set.exerciseId,
            repetitions: set.repetitions,
            weight: set.weight,
            duration: set.duration,
            distance: set.distance,
          })),
        },
      },
      include: {
        sets: { include: { exercise: true } },
      },
    });

    return NextResponse.json({ success: true, data: sessionRecord });
  } catch (err) {
    console.error("POST /api/training error:", err);
    return NextResponse.json({ success: false, error: "Failed to create session" }, { status: 500 });
  }
}
