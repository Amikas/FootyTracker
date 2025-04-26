"use client"

import { Calendar, Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import { memo } from "react"

interface Activity {
  id: number
  type: string
  date: string
  time: string
  location: string
  metrics: {
    distance: string
    duration: string
    intensity: "High" | "Medium" | "Low"
  }
}

const fetchActivities = async (): Promise<Activity[]> => {
  const response = await fetch("/api/activities/recent")
  if (!response.ok) {
    throw new Error("Failed to fetch activities")
  }
  return response.json()
}

// Memoized activity card component to prevent unnecessary re-renders
const ActivityCard = memo(function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 pb-6 border-b last:border-0 last:pb-0">
      <div className="flex-1">
        <h3 className="font-semibold mb-2">{activity.type}</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm text-muted-foreground items-center">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{activity.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>{activity.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{activity.location}</span>
          </div>
          <div className="flex items-center md:justify-end">
            <Badge
              variant={
                activity.metrics.intensity === "High"
                  ? "destructive"
                  : activity.metrics.intensity === "Medium"
                    ? "default"
                    : "secondary"
              }
            >
              {activity.metrics.intensity}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex flex-row md:flex-col justify-between gap-4 md:w-48 md:text-right">
        <div>
          <p className="text-sm text-muted-foreground">Distance</p>
          <p className="font-medium">{activity.metrics.distance}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Duration</p>
          <p className="font-medium">{activity.metrics.duration}</p>
        </div>
      </div>
    </div>
  )
})

export default function RecentActivities() {
  const { data: activities = [], isError } = useQuery({
    queryKey: ["recentActivities"],
    queryFn: fetchActivities,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  })

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription className="text-red-500">Failed to load activities</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Your latest training sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
