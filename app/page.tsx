'use client'

import { useEffect } from 'react'
import DashboardHeader from "@/components/dashboard/dashboard-header"
import PerformanceOverview from "@/components/dashboard/performance-overview"
import TrainingMetrics from "@/components/dashboard/training-metrics"
import UpcomingGoals from "@/components/dashboard/upcoming-goals"
import RecentActivities from "@/components/dashboard/recent-activities"
import { GoalsProvider } from '@/components/contexts/goals-context'
import { BounceLoader } from 'react-spinners'

export default function Dashboard() {
  // Set up automatic sync every 10 minutes
  useEffect(() => {
    const syncData = async () => {
      try {
        await fetch('/api/fitbit/sync', {
          method: 'POST',
          headers: {
            'Cache-Control': 'no-cache',
          },
        })
      } catch (error) {
        console.error('Auto-sync failed:', error)
      }
    }

    // Initial sync
    syncData()

    // Set up interval for subsequent syncs
    const interval = setInterval(syncData, 10 * 60 * 1000) // Every 10 minutes

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Training Dashboard</h1>
        <GoalsProvider>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <PerformanceOverview />
            <TrainingMetrics />
            <UpcomingGoals />
          </div>
          <div className="mt-6">
            <RecentActivities />
          </div>
        </GoalsProvider>
      </div>
    </main>
  )
}
