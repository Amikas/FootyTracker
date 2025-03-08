import DashboardHeader from "@/components/dashboard/dashboard-header"
import PerformanceOverview from "@/components/dashboard/performance-overview"
import RecentActivities from "@/components/dashboard/recent-activities"
import TrainingMetrics from "@/components/dashboard/training-metrics"
import UpcomingGoals from "@/components/dashboard/upcoming-goals"

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Training Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <PerformanceOverview />
          <TrainingMetrics />
          <UpcomingGoals />
        </div>

        <RecentActivities />
      </div>
    </main>
  )
}

