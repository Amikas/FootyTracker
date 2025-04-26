import { CheckCircle2, Circle, Trash2, Plus, Minus, PlusCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useGoals } from "@/components/contexts/goals-context"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import GoalForm from "@/components/goal-form"

export default function UpcomingGoals() {
  const { weeklyGoals, monthlyGoals, loading, deleteGoal, updateGoalProgress } = useGoals()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [goalToDelete, setGoalToDelete] = useState<{ id: string; type: 'weekly' | 'monthly' } | null>(null)
  const [goalDialogOpen, setGoalDialogOpen] = useState(false)

  const calculateProgress = (progress: number, target: number) => {
    return (progress / target) * 100
  }

  const handleProgressUpdate = async (
    id: string, 
    currentProgress: number, 
    target: number,
    type: 'weekly' | 'monthly',
    increment: boolean
  ) => {
    try {
      const step = target * 0.05 // 5% of target as step
      const newProgress = increment 
        ? Math.min(currentProgress + step, target)
        : Math.max(currentProgress - step, 0)
      
      await updateGoalProgress(id, Number(newProgress.toFixed(2)), type)
      toast({
        title: "Progress updated",
        description: `Goal progress ${increment ? 'increased' : 'decreased'} by ${step.toFixed(2)}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive",
      })
    }
  }

  const handleDeleteClick = (id: string, type: 'weekly' | 'monthly') => {
    setGoalToDelete({ id, type })
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!goalToDelete) return

    try {
      await deleteGoal(goalToDelete.id, goalToDelete.type)
      toast({
        title: "Goal deleted",
        description: "Goal has been successfully deleted",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete goal",
        variant: "destructive",
      })
    } finally {
      setDeleteDialogOpen(false)
      setGoalToDelete(null)
    }
  }

  if (loading) {
    return (
      <Card className="col-span-3 md:col-span-1 h-full">
        <CardHeader>
          <CardTitle>Upcoming Goals</CardTitle>
          <CardDescription>Loading your goals...</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <>
      <Card className="col-span-3 md:col-span-1 h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Upcoming Goals</CardTitle>
            <CardDescription>Track your progress</CardDescription>
          </div>
          <Dialog open={goalDialogOpen} onOpenChange={setGoalDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <PlusCircle className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Set New Goal</DialogTitle>
                <DialogDescription>
                  Create a new weekly or monthly goal to track your progress.
                </DialogDescription>
              </DialogHeader>
              <GoalForm onSuccess={() => setGoalDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyGoals.length === 0 ? (
              <p className="text-sm text-muted-foreground">No weekly goals set</p>
            ) : (
              weeklyGoals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{goal.title}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleProgressUpdate(goal.id, goal.progress, goal.target, 'weekly', false)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium min-w-[80px] text-center">
                        {goal.progress}/{goal.target} {goal.unit}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleProgressUpdate(goal.id, goal.progress, goal.target, 'weekly', true)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive"
                        onClick={() => handleDeleteClick(goal.id, 'weekly')}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Progress 
                    value={calculateProgress(goal.progress, goal.target)} 
                    className="h-2" 
                  />
                </div>
              ))
            )}

            <div className="pt-4 space-y-2">
              <h4 className="text-sm font-medium">Monthly Targets</h4>
              {monthlyGoals.length === 0 ? (
                <p className="text-sm text-muted-foreground">No monthly goals set</p>
              ) : (
                monthlyGoals.map((goal) => (
                  <div key={goal.id} className="flex items-center justify-between group">
                    <div className="flex items-center">
                      {goal.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground mr-2" />
                      )}
                      <span className="text-sm">{goal.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleProgressUpdate(goal.id, goal.progress, goal.target, 'monthly', false)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium min-w-[80px] text-center">
                        {goal.progress}/{goal.target} {goal.unit}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleProgressUpdate(goal.id, goal.progress, goal.target, 'monthly', true)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive"
                        onClick={() => handleDeleteClick(goal.id, 'monthly')}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your goal and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

