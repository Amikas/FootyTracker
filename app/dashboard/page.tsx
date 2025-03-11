import ActivityDisplay from '@/components/activity-display'

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Footy Performance</h1>
      
      <ActivityDisplay />
      
      {/* You can add more components here as you build out your app */}
    </div>
  )
}