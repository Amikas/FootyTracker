import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    // Get basic activity data
    const activities = await prisma.fitbitActivity.findMany({
      orderBy: {
        date: 'desc',
      },
      select: {
        date: true,
        steps: true,
        distance: true,
        calories: true,
        duration: true,
        manual: true,
      }
    })

    // Format the data
    const formattedData = activities.map(activity => ({
      date: activity.date.toISOString().split('T')[0],
      steps: activity.steps,
      distance: Number(activity.distance).toFixed(2),
      calories: activity.calories,
      duration: Math.round(activity.duration / 60000),
      source: activity.manual ? 'Manual' : 'Fitbit',
    }))

    return NextResponse.json({
      success: true,
      data: formattedData,
    })
  } catch (error) {
    console.error('Error exporting data:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to export activity data' 
      },
      { status: 500 }
    )
  }
}