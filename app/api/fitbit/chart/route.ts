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

  // Group by date (YYYY-MM-DD)
  const grouped: Record<string, { date: Date; distances: number[]; speeds: number[]; heartRates: number[] }> = {};
  for (const entry of activities) {
    const dateKey = new Date(entry.date).toISOString().split("T")[0];
    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        date: new Date(entry.date),
        distances: [],
        speeds: [],
        heartRates: [],
      };
    }
    grouped[dateKey].distances.push(entry.distance);
    // Calculate speed if possible
    if (entry.duration > 0) {
      grouped[dateKey].speeds.push(entry.distance / (entry.duration / 3600000)); // km/h
    }
    // Use entry.heartRate if available, else skip (if you add heartRate to schema)
    if ((entry as any).heartRate !== undefined && (entry as any).heartRate !== null) {
      grouped[dateKey].heartRates.push((entry as any).heartRate);
    }
  }

  const formatted = Object.values(grouped).map((group) => {
    const day = daysOfWeek[group.date.getDay()];
    const distance = group.distances.reduce((a, b) => a + b, 0);
    const speed = group.speeds.length > 0 ? +(group.speeds.reduce((a, b) => a + b, 0) / group.speeds.length).toFixed(1) : 0;
    const heartRate = group.heartRates.length > 0 ? Math.round(group.heartRates.reduce((a, b) => a + b, 0) / group.heartRates.length) : 0;
    return { day, distance, speed, heartRate };
  });

  return NextResponse.json(formatted);
}
