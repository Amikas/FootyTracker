import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  // Get today's date range (00:00 to 23:59)
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(start);
  end.setDate(start.getDate() + 1);

  // Fetch all FitbitActivity entries for today (manual and non-manual)
  const activities = await prisma.fitbitActivity.findMany({
    where: {
      date: {
        gte: start,
        lt: end,
      },
    },
  });

  if (!activities.length) {
    return NextResponse.json({
      hasData: false,
      message: "No data yet. Start your training!",
    });
  }

  // Sum distance (km), sum of speeds, average heart rate
  const totalDistance = activities.reduce((sum, a) => sum + (a.distance || 0), 0);
  const totalSpeed = activities.reduce((sum, a) => sum + (a.speed || 0), 0); // sum of speeds
  const avgHeartRate = activities.filter(a => a.heartRate != null).length
    ? Math.round(
        activities.filter(a => a.heartRate != null).reduce((sum, a) => sum + (a.heartRate || 0), 0) /
        activities.filter(a => a.heartRate != null).length
      )
    : null;

  return NextResponse.json({
    hasData: true,
    distance: totalDistance,
    avgSpeed: totalSpeed,
    avgHeartRate,
    lastUpdated: activities.reduce((latest, a) => {
      const updated = a.lastUpdated || a.createdAt;
      return updated > latest ? updated : latest;
    }, new Date(0)),
  });
}
