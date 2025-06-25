import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/records?userId=xxx
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) return NextResponse.json([]);
  const records = await prisma.record.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });
  return NextResponse.json(records);
}

// POST /api/records
export async function POST(req: Request) {
  const body = await req.json();
  const { userId, exercise, value, unit } = body;
  if (!userId || !exercise || !value || !unit) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const record = await prisma.record.create({
    data: { userId, exercise, value, unit },
  });
  return NextResponse.json(record);
}
