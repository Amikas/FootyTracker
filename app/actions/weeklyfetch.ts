'use server'

import prisma from '@/lib/prisma'
import { getUserActivityData } from './fitbit'

export async function fetchWeeklyChartData() {
  // Get past 7 days (most recent first)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)

  const data = await prisma.fitbitActivity.findMany({
    where: {
      date: {
        gte: new Date(sevenDaysAgo.toDateString()), // Midnight
      },
    },
    orderBy: {
      date: 'asc',
    },
  })

  // Format for the chart
  return data.map(entry => ({
    day: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }),
    distance: entry.distance,
    speed: entry.duration > 0 ? +(entry.distance / (entry.duration / 3600000)).toFixed(1) : 0, // km/h
    heartRate: 0, // Placeholder until we get HR data
  }))
}
