import { CheckCircle2, Circle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function UpcomingGoals() {
  return (
    <Card className="col-span-3 md:col-span-1 h-full">
      <CardHeader>
        <CardTitle>Upcoming Goals</CardTitle>
        <CardDescription>Track your progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Weekly Distance</span>
              <span className="text-sm font-medium">27.8/30 km</span>
            </div>
            <Progress value={93} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Sprint Sessions</span>
              <span className="text-sm font-medium">2/3</span>
            </div>
            <Progress value={67} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Recovery Days</span>
              <span className="text-sm font-medium">2/2</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>

          <div className="pt-4 space-y-2">
            <h4 className="text-sm font-medium">Monthly Targets</h4>
            <div className="flex items-center">
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm">Improve top speed by 5%</span>
            </div>
            <div className="flex items-center">
              <Circle className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-sm">Complete 12 training sessions</span>
            </div>
            <div className="flex items-center">
              <Circle className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-sm">Maintain avg. heart rate below 165 bpm</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

