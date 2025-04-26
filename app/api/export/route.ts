import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    // Get activity data
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

    // Get goals data
    const goals = await prisma.goal.findMany({
      where: {
        completed: true,
      },
      orderBy: {
        endDate: 'desc',
      }
    })

    // Format the data as CSV
    const headers = ['Date', 'Duration (mins)', 'Distance (km)', 'Steps', 'Calories', 'Source', 'Goals Completed']
    const rows = activities.map(activity => {
      const date = activity.date.toISOString().split('T')[0]
      const goalsOnDate = goals.filter(goal => 
        goal.endDate.toISOString().split('T')[0] === date
      ).length

      return [
        date,
        Math.round(activity.duration / 60000), // Convert ms to minutes
        Number(activity.distance).toFixed(2),
        activity.steps,
        activity.calories,
        activity.manual ? 'Manual' : 'Fitbit',
        goalsOnDate
      ].join(',')
    })

    const csvContent = [headers.join(','), ...rows].join('\n')

    // Return CSV with appropriate headers
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=training-data.csv'
      }
    })
  } catch (error) {
    console.error('Error exporting data:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to export training data' 
      },
      { status: 500 }
    )
  }
}