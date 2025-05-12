import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface Goal {
  id: string
  title: string
  type: 'weekly' | 'monthly'
  target: number
  unit: string
  progress: number
  completed: boolean
  endDate: string
}

interface GoalsContextType {
  weeklyGoals: Goal[]
  monthlyGoals: Goal[]
  loading: boolean
  addGoal: (goal: Omit<Goal, 'id' | 'progress' | 'completed'>) => Promise<void>
  deleteGoal: (id: string, type: 'weekly' | 'monthly') => Promise<void>
  updateGoalProgress: (id: string, progress: number, type: 'weekly' | 'monthly') => Promise<void>
  refreshGoals: () => Promise<void>
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined)

export function GoalsProvider({ children }: { children: ReactNode }) {
  const [weeklyGoals, setWeeklyGoals] = useState<Goal[]>([])
  const [monthlyGoals, setMonthlyGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { data: session, status } = useSession()

  const fetchGoals = async (userId: string) => {
    try {
      const [weeklyResponse, monthlyResponse] = await Promise.all([
        fetch(`/api/goals?userId=${userId}&type=weekly`),
        fetch(`/api/goals?userId=${userId}&type=monthly`)
      ])
      
      if (weeklyResponse.ok && monthlyResponse.ok) {
        const weeklyData = await weeklyResponse.json()
        const monthlyData = await monthlyResponse.json()
        setWeeklyGoals(weeklyData)
        setMonthlyGoals(monthlyData)
      }
    } catch (error) {
      console.error('Failed to fetch goals:', error)
    } finally {
      setLoading(false)
    }
  }

  const refreshGoals = async () => {
    if (!session?.user?.id) {
      router.push("/login")
      return
    }
    await fetchGoals(session.user.id)
  }

  const addGoal = async (newGoal: Omit<Goal, 'id' | 'progress' | 'completed'>) => {
    if (!session?.user?.id) {
      router.push("/login")
      return
    }

    // Optimistically update the UI
    const optimisticGoal = {
      id: Date.now().toString(), // temporary ID
      ...newGoal,
      progress: 0,
      completed: false
    }

    if (newGoal.type === 'weekly') {
      setWeeklyGoals(prev => [optimisticGoal, ...prev])
    } else {
      setMonthlyGoals(prev => [optimisticGoal, ...prev])
    }

    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newGoal, userId: session.user.id }),
      })

      if (!response.ok) {
        throw new Error('Failed to create goal')
      }

      // Refresh goals to get the actual data from server
      await refreshGoals()
    } catch (error) {
      console.error('Error creating goal:', error)
      // Revert optimistic update on error
      if (newGoal.type === 'weekly') {
        setWeeklyGoals(prev => prev.filter(g => g.id !== optimisticGoal.id))
      } else {
        setMonthlyGoals(prev => prev.filter(g => g.id !== optimisticGoal.id))
      }
      throw error
    }
  }

  const deleteGoal = async (id: string, type: 'weekly' | 'monthly') => {
    if (!session?.user?.id) {
      router.push("/login")
      return
    }

    // Optimistically update UI
    if (type === 'weekly') {
      setWeeklyGoals(prev => prev.filter(g => g.id !== id))
    } else {
      setMonthlyGoals(prev => prev.filter(g => g.id !== id))
    }

    try {
      const response = await fetch(`/api/goals?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error('Failed to delete goal')
      }
    } catch (error) {
      console.error('Error deleting goal:', error)
      // Revert optimistic update on error
      await refreshGoals()
      throw error
    }
  }

  const updateGoalProgress = async (id: string, progress: number, type: 'weekly' | 'monthly') => {
    if (!session?.user?.id) {
      router.push("/login")
      return
    }

    // Optimistically update UI
    const updateGoals = (goals: Goal[]) =>
      goals.map(g => g.id === id ? { ...g, progress, completed: progress >= g.target } : g)

    if (type === 'weekly') {
      setWeeklyGoals(prev => updateGoals(prev))
    } else {
      setMonthlyGoals(prev => updateGoals(prev))
    }

    try {
      const response = await fetch("/api/goals", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          id, 
          progress,
          completed: progress >= (type === 'weekly' 
            ? weeklyGoals.find(g => g.id === id)?.target ?? 0 
            : monthlyGoals.find(g => g.id === id)?.target ?? 0) 
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update goal progress')
      }
    } catch (error) {
      console.error('Error updating goal progress:', error)
      // Revert optimistic update on error
      await refreshGoals()
      throw error
    }
  }

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session?.user?.id) {
      router.push("/login")
      return
    }
    
    fetchGoals(session.user.id)
  }, [session, status, router])

  return (
    <GoalsContext.Provider value={{ 
      weeklyGoals, 
      monthlyGoals, 
      loading, 
      addGoal, 
      deleteGoal,
      updateGoalProgress,
      refreshGoals 
    }}>
      {children}
    </GoalsContext.Provider>
  )
}

export function useGoals() {
  const context = useContext(GoalsContext)
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalsProvider')
  }
  return context
} 