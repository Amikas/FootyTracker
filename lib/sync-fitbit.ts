import { PrismaClient } from '@prisma/client'
import { getUserActivityData } from '@/app/actions/fitbit'

const prisma = new PrismaClient()

export async function syncFitbitForDate(date: string) {
  const result = await getUserActivityData(date)

  if (!result.success || !result.data) {
    console.error('Failed to fetch Fitbit data:', result.error)
    return { success: false, error: result.error }
  }

  const summary = result.data.summary
  const distance = summary.distances.find((d: any) => d.activity === 'total')?.distance || 0

  await prisma.fitbitActivity.upsert({
    where: { date: new Date(date) },
    update: {
      duration: result.data.activities[0]?.duration || 0,
      calories: result.data.activities[0]?.calories || 0,
      steps: summary.steps || 0,
      distance,
    },
    create: {
      date: new Date(date),
      duration: result.data.activities[0]?.duration || 0,
      calories: result.data.activities[0]?.calories || 0,
      steps: summary.steps || 0,
      distance,
    },
  })

  return { success: true }
}
