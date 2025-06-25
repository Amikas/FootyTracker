import prisma from '@/lib/prisma'
import { getUserActivityData } from '@/app/actions/fitbit'

export async function syncFitbitData(
  retryAttempts = 3
): Promise<{ success: boolean; error?: string; data?: any }> {
  // Format today's date
  const today = new Date()
  const formattedDate = today.toISOString().split('T')[0]

  // Try to get data with retries
  let result = null
  let attempts = 0

  while (attempts < retryAttempts) {
    try {
      result = await getUserActivityData(formattedDate)
      if (result.success && result.data?.summary) {
        break
      }
      attempts++
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, attempts))
      )
    } catch (error) {
      console.error(`Fitbit API error on attempt ${attempts + 1}:`, error)
      attempts++
      if (attempts >= retryAttempts) {
        return {
          success: false,
          error: `Failed to fetch Fitbit data after ${retryAttempts} attempts`,
        }
      }
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, attempts))
      )
    }
  }

  if (!result?.success || !result.data?.summary) {
    console.log(`No data returned for ${formattedDate}, skipping update.`)
    return { success: false, error: 'No data from Fitbit' }
  }

  const summary = result.data.summary

  const steps = Math.max(0, summary.steps || 0)
  const distance = Math.max(0, summary.distances?.[0]?.distance || 0)
  const calories = Math.max(0, summary.caloriesOut || 0)

  let duration = 0
  if (summary.activities && summary.activities.length > 0) {
    duration = summary.activities.reduce(
      (total: number, activity: any) => total + (activity.duration || 0),
      0
    )
  } else {
    duration = summary.fairlyActiveMinutes
      ? summary.fairlyActiveMinutes * 60000
      : 0
  }

  const hasRealData = steps > 0 || distance > 0 || calories > 0
  if (!hasRealData) {
    console.log(`Fitbit returned zero activity on ${formattedDate} — skipping.`)
    return { success: false, error: 'No activity to record' }
  }

  try {
    // Use findFirst instead of findUnique, since date is not unique
    const existing = await prisma.fitbitActivity.findFirst({
      where: { date: new Date(formattedDate) },
    })

    let totalSteps = steps
    let totalDistance = distance
    let totalCalories = calories
    let totalDuration = duration

    // If it's a manual record, add the Fitbit data to the manual entry
    if (existing?.manual) {
      console.log(
        `Merging manual entry for ${formattedDate} with Fitbit sync data.`
      )
      totalSteps += existing.steps
      totalDistance += existing.distance
      totalCalories += existing.calories
      totalDuration += existing.duration
    }

    if (existing) {
      // Update the existing record
      const updated = await prisma.fitbitActivity.update({
        where: { id: existing.id },
        data: {
          steps: totalSteps,
          distance: totalDistance,
          calories: totalCalories,
          duration: totalDuration,
          lastUpdated: new Date(),
          manual: existing.manual || false,
        },
      })
      console.log(`Successfully updated Fitbit data for ${formattedDate}`)
      return { success: true, data: updated }
    } else {
      // Create a new record
      const created = await prisma.fitbitActivity.create({
        data: {
          date: new Date(formattedDate),
          steps: totalSteps,
          distance: totalDistance,
          calories: totalCalories,
          duration: totalDuration,
          lastUpdated: new Date(),
          manual: false,
        },
      })
      console.log(`Successfully created Fitbit data for ${formattedDate}`)
      return { success: true, data: created }
    }
  } catch (error) {
    console.error(`Database error while saving Fitbit data:`, error)
    return { success: false, error: 'Failed to save data to database' }
  }
}
