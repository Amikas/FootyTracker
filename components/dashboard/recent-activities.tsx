import { Calendar, Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample data - in a real app, this would come from your API
const activities = [
  {
    id: 1,
    type: "Training Session",
    date: "Today",
    time: "10:00 AM - 11:30 AM",
    location: "City Park Field",
    metrics: {
      distance: "8.2 km",
      duration: "90 min",
      intensity: "High",
    },
  },
  {
    id: 2,
    type: "Recovery Run",
    date: "Yesterday",
    time: "8:30 AM - 9:15 AM",
    location: "Riverside Track",
    metrics: {
      distance: "3.1 km",
      duration: "45 min",
      intensity: "Low",
    },
  },
  {
    id: 3,
    type: "Team Practice",
    date: "2 days ago",
    time: "6:00 PM - 8:00 PM",
    location: "Central Stadium",
    metrics: {
      distance: "6.8 km",
      duration: "120 min",
      intensity: "Medium",
    },
  },
]

export default function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Your latest training sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex flex-col md:flex-row gap-4 pb-6 border-b last:border-0 last:pb-0">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{activity.type}</h3>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
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
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

