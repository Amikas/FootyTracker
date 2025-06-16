import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET /api/training/exercises
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const exercises = await prisma.exercise.findMany({
      where: {
        OR: [
          { createdBy: session.user.id },
          { createdBy: null } // Default exercises
        ]
      },
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json({ success: true, data: exercises });
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// POST /api/training/exercises
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, category, description } = body;

    if (!name || !category) {
      return new NextResponse("Name and category are required", { status: 400 });
    }

    const exercise = await prisma.exercise.create({
      data: {
        name,
        category,
        description,
        createdBy: session.user.id
      }
    });

    return NextResponse.json({ success: true, data: exercise });
  } catch (error) {
    console.error("Error creating exercise:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 