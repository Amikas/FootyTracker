'use client'

import { useEffect } from 'react'
import DashboardHeader from "@/components/dashboard/dashboard-header"
import PerformanceOverview from "@/components/dashboard/performance-overview"
import TrainingMetrics from "@/components/dashboard/training-metrics"
import UpcomingGoals from "@/components/dashboard/upcoming-goals"
import RecentActivities from "@/components/dashboard/recent-activities"
import { GoalsProvider } from '@/components/contexts/goals-context'
import OllamaChatbot from "@/components/ollama-chatbot"
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

    // Sync data when the tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        syncData()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <>
      <DashboardHeader />
      <main 
        id="main-content" 
        className="flex min-h-screen flex-col"
        tabIndex={-1} // Makes the main content focusable for the skip link
      >
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-6" tabIndex={-1}>
            Training Dashboard
          </h1>
          <GoalsProvider>
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
              role="region"
              aria-label="Performance Overview"
            >
              <PerformanceOverview />
              <TrainingMetrics />
              <UpcomingGoals />
            </div>
            <div 
              className="mt-6"
              role="region"
              aria-label="Recent Activities"
            >
              <RecentActivities />
            </div>
          </GoalsProvider>
        </div>
      </main>
      <OllamaChatbot />
    </>
  )
}
