import { Activity, Heart, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TrainingMetrics() {
  return (
    <Card className="col-span-3 md:col-span-1">
      <CardHeader>
        <CardTitle>Training Metrics</CardTitle>
        <CardDescription>Your latest training session</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Distance</p>
              <p className="text-2xl font-bold">8.2 km</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. Speed</p>
              <p className="text-2xl font-bold">15 km/h</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. Heart Rate</p>
              <p className="text-2xl font-bold">162 bpm</p>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground">Last updated: Today, 10:45 AM</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

