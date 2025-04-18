'use client'

import { useEffect, useState } from 'react'
import DashboardHeader from "@/components/dashboard/dashboard-header"
import PerformanceOverview from "@/components/dashboard/performance-overview"
import RecentActivities from "@/components/dashboard/recent-activities"
import TrainingMetrics from "@/components/dashboard/training-metrics"
import UpcomingGoals from "@/components/dashboard/upcoming-goals"
import { toast } from '@/components/ui/use-toast'
import GoalForm from '@/components/goal-form'
import { GoalsProvider } from '@/components/contexts/goals-context'
import { BounceLoader } from 'react-spinners'

export default function Dashboard() {
  const [hasSynced, setHasSynced] = useState(false)

  useEffect(() => {
    const syncData = async () => {
      try {
        const res = await fetch('/api/fitbit/sync', { method: 'POST' })
        const result = await res.json()
        if (result.success) {
          toast({ title: 'Fitbit synced successfully ✅' })
        } else {
          toast({ title: 'Fitbit sync failed ❌', description: result.error || 'Unknown error' })
        }
      } catch (error) {
        toast({ title: 'Sync error', description: 'Unable to sync Fitbit data' })
      } finally {
        setHasSynced(true)
      }
    }

    syncData()
  }, [])

  return (
    <main className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Training Dashboard</h1>

        {!hasSynced ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <BounceLoader color="#ffffff" size={120}  className="mb-8" /> 
            <p className="mt-4 text-sm italic animate-pulse text-blue-500">Loading...</p>

          </div>
        ) : (
          <GoalsProvider>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <PerformanceOverview />
              <TrainingMetrics />
              <UpcomingGoals />
            </div>
            <div className="space-y-6">
              <RecentActivities  />
              <GoalForm />
            </div>
          </GoalsProvider>
        )}
      </div>
    </main>
  )
}
