import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET /api/training/routines
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const routines = await prisma.routine.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        exercises: {
          include: {
            exercise: true
          },
          orderBy: {
            order: 'asc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ success: true, data: routines });
  } catch (error) {
    console.error("Error fetching routines:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// POST /api/training/routines
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, description, exercises } = body;

    if (!name || !exercises || !Array.isArray(exercises)) {
      return new NextResponse("Name and exercises array are required", { status: 400 });
    }

    const routine = await prisma.routine.create({
      data: {
        name,
        description,
        userId: session.user.id,
        exercises: {
          create: exercises.map((ex: { exerciseId: string, order: number }) => ({
            exerciseId: ex.exerciseId,
            order: ex.order
          }))
        }
      },
      include: {
        exercises: {
          include: {
            exercise: true
          },
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    return NextResponse.json({ success: true, data: routine });
  } catch (error) {
    console.error("Error creating routine:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 