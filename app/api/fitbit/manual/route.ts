import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Create manual entry
export async function POST(req: Request) {
  const body = await req.json();
  const { date, distance, duration, calories, steps, heartRate } = body;
  if (!date || distance == null || duration == null) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const entry = await prisma.fitbitActivity.create({
    data: {
      date: new Date(date),
      distance,
      duration,
      calories: calories ?? 0,
      steps: steps ?? 0,
      manual: true,
      ...(heartRate !== undefined ? { heartRate } : {}),
    },
  });
  return NextResponse.json(entry);
}

// Edit manual entry
export async function PUT(req: Request) {
  const body = await req.json();
  const { id, distance, duration, calories, steps, heartRate } = body;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const entry = await prisma.fitbitActivity.update({
    where: { id },
    data: {
      distance,
      duration,
      calories,
      steps,
      ...(heartRate !== undefined ? { heartRate } : {}),
    },
  });
  return NextResponse.json(entry);
}

// Delete manual entry
export async function DELETE(req: Request) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await prisma.fitbitActivity.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
