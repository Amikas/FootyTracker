import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGoals } from "@/components/contexts/goals-context"

interface GoalFormProps {
  onSuccess?: () => void
}

export default function GoalForm({ onSuccess }: GoalFormProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const { addGoal } = useGoals()
  const { data: session, status } = useSession()

  // Only render form if authenticated
  if (status === 'loading') return null
  if (!session?.user?.id) {
    return (
      <div className="text-center text-red-500">You must be logged in to set a goal.</div>
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      const title = formData.get("title")?.toString()
      const type = formData.get("type")?.toString() as 'weekly' | 'monthly'
      const target = formData.get("target")?.toString()
      const unit = formData.get("unit")?.toString()
      const endDate = formData.get("endDate")?.toString()

      // Validate required fields
      if (!title || !type || !target || !unit || !endDate) {
        throw new Error("All fields are required")
      }

      await addGoal({
        title,
        type,
        target: parseFloat(target),
        unit,
        endDate: new Date(endDate).toISOString(),
      })

      form.reset()
      onSuccess?.()
    } catch (error) {
      console.error("Error creating goal:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Goal Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="e.g., Weekly Distance"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Goal Type</Label>
        <Select name="type" required>
          <SelectTrigger>
            <SelectValue placeholder="Select goal type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="target">Target</Label>
          <Input
            id="target"
            name="target"
            type="number"
            step="0.1"
            placeholder="e.g., 30"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="unit">Unit</Label>
          <Input
            id="unit"
            name="unit"
            placeholder="e.g., km"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="endDate">End Date</Label>
        <Input
          id="endDate"
          name="endDate"
          type="date"
          required
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Goal"}
        </Button>
      </div>
    </form>
  )
}
