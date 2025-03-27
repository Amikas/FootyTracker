import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export async function GET() {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 6);

  const activities = await prisma.fitbitActivity.findMany({
    where: {
      date: {
        gte: sevenDaysAgo,
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  const formatted = activities.map((entry) => ({
    day: daysOfWeek[new Date(entry.date).getDay()],
    distance: entry.distance,
    speed: 12 + Math.random() * 3, // 🔧 Placeholder
    heartRate: 130 + Math.floor(Math.random() * 20), // 🔧 Placeholder
  }));

  return NextResponse.json(formatted);
}
