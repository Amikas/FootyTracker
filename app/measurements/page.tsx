"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calculator, Droplets, Flame, Moon, Trophy, Plus, Scale, Edit, Trash2, Clock } from "lucide-react"

interface CalorieEntry {
  id: string
  food: string
  calories: number
  meal: "breakfast" | "lunch" | "dinner" | "snack"
  timestamp: Date
  notes?: string
}

interface WaterEntry {
  id: string
  amount: number
  timestamp: Date
  type: "glass" | "bottle" | "custom"
}

interface SleepEntry {
  id: string
  startTime: string
  endTime: string
  duration: number
  quality: "poor" | "fair" | "good" | "excellent"
  date: string
  notes?: string
}

interface BestRecord {
  id: string
  category: string
  value: number
  unit: string
  date: string
  previousBest?: number
  notes?: string
}

export default function MeasurementsPage() {
  // Calorie Management State
  const [calorieEntries, setCalorieEntries] = useState<CalorieEntry[]>([])
  const [editingCalorie, setEditingCalorie] = useState<CalorieEntry | null>(null)
  const [newFood, setNewFood] = useState("")
  const [newCalories, setNewCalories] = useState("")
  const [newMeal, setNewMeal] = useState<"breakfast" | "lunch" | "dinner" | "snack">("breakfast")
  const [newNotes, setNewNotes] = useState("")
  const [dailyCalorieGoal, setDailyCalorieGoal] = useState(2000)

  // Water Intake State
  const [waterEntries, setWaterEntries] = useState<WaterEntry[]>([])
  const [dailyWaterGoal, setDailyWaterGoal] = useState(2000)
  const [customWaterAmount, setCustomWaterAmount] = useState("")

  // Sleep Tracking State
  const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>([])
  const [editingSleep, setEditingSleep] = useState<SleepEntry | null>(null)
  const [newStartTime, setNewStartTime] = useState("")
  const [newEndTime, setNewEndTime] = useState("")
  const [newSleepQuality, setNewSleepQuality] = useState<"poor" | "fair" | "good" | "excellent">("good")
  const [newSleepNotes, setNewSleepNotes] = useState("")

  // Best Records State
  const [bestRecords, setBestRecords] = useState<BestRecord[]>([])
  const [editingRecord, setEditingRecord] = useState<BestRecord | null>(null)
  const [newRecordCategory, setNewRecordCategory] = useState("")
  const [newRecordValue, setNewRecordValue] = useState("")
  const [newRecordUnit, setNewRecordUnit] = useState("")
  const [newRecordNotes, setNewRecordNotes] = useState("")

  // BMI Calculator State
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [bmi, setBmi] = useState<number | null>(null)
  const [bmiHistory, setBmiHistory] = useState<Array<{ date: string; bmi: number; weight: number }>>([])

  // Utility Functions
  const getTodayString = () => new Date().toISOString().split("T")[0]

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const calculateSleepDuration = (start: string, end: string) => {
    const startTime = new Date(`2000-01-01T${start}`)
    let endTime = new Date(`2000-01-01T${end}`)

    // Handle overnight sleep
    if (endTime <= startTime) {
      endTime = new Date(`2000-01-02T${end}`)
    }

    return (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)
  }

  // Calorie Management Functions
  const addCalorieEntry = () => {
    if (newFood && newCalories) {
      const entry: CalorieEntry = {
        id: Date.now().toString(),
        food: newFood,
        calories: Number.parseInt(newCalories),
        meal: newMeal,
        timestamp: new Date(),
        notes: newNotes || undefined,
      }
      setCalorieEntries([...calorieEntries, entry])
      resetCalorieForm()
    }
  }

  const updateCalorieEntry = () => {
    if (editingCalorie && newFood && newCalories) {
      const updatedEntries = calorieEntries.map((entry) =>
        entry.id === editingCalorie.id
          ? {
              ...entry,
              food: newFood,
              calories: Number.parseInt(newCalories),
              meal: newMeal,
              notes: newNotes || undefined,
            }
          : entry,
      )
      setCalorieEntries(updatedEntries)
      resetCalorieForm()
      setEditingCalorie(null)
    }
  }

  const deleteCalorieEntry = (id: string) => {
    setCalorieEntries(calorieEntries.filter((entry) => entry.id !== id))
  }

  const editCalorieEntry = (entry: CalorieEntry) => {
    setEditingCalorie(entry)
    setNewFood(entry.food)
    setNewCalories(entry.calories.toString())
    setNewMeal(entry.meal)
    setNewNotes(entry.notes || "")
  }

  const resetCalorieForm = () => {
    setNewFood("")
    setNewCalories("")
    setNewMeal("breakfast")
    setNewNotes("")
  }

  const getTodayCalories = () => {
    const today = getTodayString()
    return calorieEntries
      .filter((entry) => entry.timestamp.toISOString().split("T")[0] === today)
      .reduce((total, entry) => total + entry.calories, 0)
  }

  const getCaloriesByMeal = (meal: string) => {
    const today = getTodayString()
    return calorieEntries
      .filter((entry) => entry.timestamp.toISOString().split("T")[0] === today && entry.meal === meal)
      .reduce((total, entry) => total + entry.calories, 0)
  }

  // Water Intake Functions
  const addWaterEntry = (amount: number, type: "glass" | "bottle" | "custom") => {
    const entry: WaterEntry = {
      id: Date.now().toString(),
      amount,
      type,
      timestamp: new Date(),
    }
    setWaterEntries([...waterEntries, entry])
  }

  const addCustomWater = () => {
    if (customWaterAmount) {
      addWaterEntry(Number.parseInt(customWaterAmount), "custom")
      setCustomWaterAmount("")
    }
  }

  const getTodayWater = () => {
    const today = getTodayString()
    return waterEntries
      .filter((entry) => entry.timestamp.toISOString().split("T")[0] === today)
      .reduce((total, entry) => total + entry.amount, 0)
  }

  // Sleep Tracking Functions
  const addSleepEntry = () => {
    if (newStartTime && newEndTime) {
      const duration = calculateSleepDuration(newStartTime, newEndTime)
      const entry: SleepEntry = {
        id: Date.now().toString(),
        startTime: newStartTime,
        endTime: newEndTime,
        duration,
        quality: newSleepQuality,
        date: getTodayString(),
        notes: newSleepNotes || undefined,
      }
      setSleepEntries([...sleepEntries, entry])
      resetSleepForm()
    }
  }

  const updateSleepEntry = () => {
    if (editingSleep && newStartTime && newEndTime) {
      const duration = calculateSleepDuration(newStartTime, newEndTime)
      const updatedEntries = sleepEntries.map((entry) =>
        entry.id === editingSleep.id
          ? {
              ...entry,
              startTime: newStartTime,
              endTime: newEndTime,
              duration,
              quality: newSleepQuality,
              notes: newSleepNotes || undefined,
            }
          : entry,
      )
      setSleepEntries(updatedEntries)
      resetSleepForm()
      setEditingSleep(null)
    }
  }

  const deleteSleepEntry = (id: string) => {
    setSleepEntries(sleepEntries.filter((entry) => entry.id !== id))
  }

  const editSleepEntry = (entry: SleepEntry) => {
    setEditingSleep(entry)
    setNewStartTime(entry.startTime)
    setNewEndTime(entry.endTime)
    setNewSleepQuality(entry.quality)
    setNewSleepNotes(entry.notes || "")
  }

  const resetSleepForm = () => {
    setNewStartTime("")
    setNewEndTime("")
    setNewSleepQuality("good")
    setNewSleepNotes("")
  }

  const getAverageSleep = () => {
    if (sleepEntries.length === 0) return 0
    const total = sleepEntries.reduce((sum, entry) => sum + entry.duration, 0)
    return (total / sleepEntries.length).toFixed(1)
  }

  // Best Records Functions
  const addBestRecord = () => {
    if (newRecordCategory && newRecordValue && newRecordUnit) {
      const existingRecord = bestRecords.find((r) => r.category.toLowerCase() === newRecordCategory.toLowerCase())
      const record: BestRecord = {
        id: Date.now().toString(),
        category: newRecordCategory,
        value: Number.parseFloat(newRecordValue),
        unit: newRecordUnit,
        date: getTodayString(),
        previousBest: existingRecord?.value,
        notes: newRecordNotes || undefined,
      }

      if (existingRecord) {
        setBestRecords(bestRecords.map((r) => (r.id === existingRecord.id ? record : r)))
      } else {
        setBestRecords([...bestRecords, record])
      }
      resetRecordForm()
    }
  }

  const updateBestRecord = () => {
    if (editingRecord && newRecordCategory && newRecordValue && newRecordUnit) {
      const updatedRecords = bestRecords.map((record) =>
        record.id === editingRecord.id
          ? {
              ...record,
              category: newRecordCategory,
              value: Number.parseFloat(newRecordValue),
              unit: newRecordUnit,
              notes: newRecordNotes || undefined,
            }
          : record,
      )
      setBestRecords(updatedRecords)
      resetRecordForm()
      setEditingRecord(null)
    }
  }

  const deleteRecord = (id: string) => {
    setBestRecords(bestRecords.filter((record) => record.id !== id))
  }

  const editRecord = (record: BestRecord) => {
    setEditingRecord(record)
    setNewRecordCategory(record.category)
    setNewRecordValue(record.value.toString())
    setNewRecordUnit(record.unit)
    setNewRecordNotes(record.notes || "")
  }

  const resetRecordForm = () => {
    setNewRecordCategory("")
    setNewRecordValue("")
    setNewRecordUnit("")
    setNewRecordNotes("")
  }

  // BMI Calculator Functions
  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = Number.parseFloat(height) / 100
      const weightInKg = Number.parseFloat(weight)
      const calculatedBMI = weightInKg / (heightInMeters * heightInMeters)
      setBmi(calculatedBMI)

      // Add to history
      const historyEntry = {
        date: getTodayString(),
        bmi: calculatedBMI,
        weight: weightInKg,
      }
      setBmiHistory([...bmiHistory.filter((h) => h.date !== getTodayString()), historyEntry])
    }
  }

  const getBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5) return { category: "Underweight", color: "bg-blue-500" }
    if (bmiValue < 25) return { category: "Normal weight", color: "bg-green-500" }
    if (bmiValue < 30) return { category: "Overweight", color: "bg-yellow-500" }
    return { category: "Obese", color: "bg-red-500" }
  }

  const todayCalories = getTodayCalories()
  const todayWater = getTodayWater()
  const calorieProgress = (todayCalories / dailyCalorieGoal) * 100
  const waterProgress = (todayWater / dailyWaterGoal) * 100

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Measurements Dashboard</h1>
        <p className="text-muted-foreground">Track your health and fitness metrics</p>
      </div>

      <Tabs defaultValue="calories" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="calories" className="flex items-center gap-2">
            <Flame className="h-4 w-4" />
            Calories
          </TabsTrigger>
          <TabsTrigger value="water" className="flex items-center gap-2">
            <Droplets className="h-4 w-4" />
            Water
          </TabsTrigger>
          <TabsTrigger value="sleep" className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            Sleep
          </TabsTrigger>
          <TabsTrigger value="records" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Records
          </TabsTrigger>
          <TabsTrigger value="bmi" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            BMI
          </TabsTrigger>
        </TabsList>

        {/* Calorie Management Tab */}
        <TabsContent value="calories" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Progress</CardTitle>
                <CardDescription>Track your calorie intake throughout the day</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Today's Progress</span>
                    <span>
                      {todayCalories} / {dailyCalorieGoal} kcal
                    </span>
                  </div>
                  <Progress value={Math.min(calorieProgress, 100)} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-semibold">{getCaloriesByMeal("breakfast")}</div>
                    <div className="text-sm text-muted-foreground">Breakfast</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-semibold">{getCaloriesByMeal("lunch")}</div>
                    <div className="text-sm text-muted-foreground">Lunch</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-semibold">{getCaloriesByMeal("dinner")}</div>
                    <div className="text-sm text-muted-foreground">Dinner</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-semibold">{getCaloriesByMeal("snack")}</div>
                    <div className="text-sm text-muted-foreground">Snacks</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="calorie-goal">Daily Goal (kcal)</Label>
                  <Input
                    id="calorie-goal"
                    type="number"
                    value={dailyCalorieGoal}
                    onChange={(e) => setDailyCalorieGoal(Number.parseInt(e.target.value) || 2000)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{editingCalorie ? "Edit Entry" : "Add Food Entry"}</CardTitle>
                <CardDescription>Log your meals and snacks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="food">Food Item</Label>
                  <Input
                    id="food"
                    placeholder="e.g., Grilled Chicken Breast"
                    value={newFood}
                    onChange={(e) => setNewFood(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="calories">Calories</Label>
                    <Input
                      id="calories"
                      type="number"
                      placeholder="250"
                      value={newCalories}
                      onChange={(e) => setNewCalories(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meal">Meal Type</Label>
                    <Select
                      value={newMeal}
                      onValueChange={(value: "breakfast" | "lunch" | "dinner" | "snack") => setNewMeal(value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional details..."
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={editingCalorie ? updateCalorieEntry : addCalorieEntry} className="flex-1">
                    <Plus className="h-4 w-4 mr-2" />
                    {editingCalorie ? "Update Entry" : "Add Entry"}
                  </Button>
                  {editingCalorie && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingCalorie(null)
                        resetCalorieForm()
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Food Log</CardTitle>
              <CardDescription>Your recent food entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {calorieEntries
                  .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                  .map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{entry.food}</span>
                          <Badge variant="secondary">{entry.meal}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {entry.calories} kcal • {entry.timestamp.toLocaleString()}
                        </div>
                        {entry.notes && <div className="text-sm text-muted-foreground mt-1">{entry.notes}</div>}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => editCalorieEntry(entry)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteCalorieEntry(entry.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Water Intake Tab */}
        <TabsContent value="water" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Water Intake</CardTitle>
                <CardDescription>Stay hydrated throughout the day</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{todayWater}ml</div>
                  <div className="text-sm text-muted-foreground">Today's Intake</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>
                      {todayWater} / {dailyWaterGoal} ml
                    </span>
                  </div>
                  <Progress value={Math.min(waterProgress, 100)} className="h-3" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="water-goal">Daily Goal (ml)</Label>
                  <Input
                    id="water-goal"
                    type="number"
                    value={dailyWaterGoal}
                    onChange={(e) => setDailyWaterGoal(Number.parseInt(e.target.value) || 2000)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add Water Intake</CardTitle>
                <CardDescription>Log your water consumption</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => addWaterEntry(250, "glass")}
                    className="flex flex-col h-20 gap-2"
                  >
                    <Droplets className="h-6 w-6" />
                    <div className="text-center">
                      <div className="text-sm font-medium">Glass</div>
                      <div className="text-xs text-muted-foreground">250ml</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => addWaterEntry(500, "bottle")}
                    className="flex flex-col h-20 gap-2"
                  >
                    <Droplets className="h-6 w-6" />
                    <div className="text-center">
                      <div className="text-sm font-medium">Bottle</div>
                      <div className="text-xs text-muted-foreground">500ml</div>
                    </div>
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-water">Custom Amount (ml)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="custom-water"
                      type="number"
                      placeholder="750"
                      value={customWaterAmount}
                      onChange={(e) => setCustomWaterAmount(e.target.value)}
                    />
                    <Button onClick={addCustomWater}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Today's Log</Label>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {waterEntries
                      .filter((entry) => entry.timestamp.toISOString().split("T")[0] === getTodayString())
                      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                      .map((entry) => (
                        <div key={entry.id} className="flex justify-between text-sm p-2 bg-muted rounded">
                          <span>
                            {entry.amount}ml ({entry.type})
                          </span>
                          <span>{entry.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sleep Tracking Tab */}
        <TabsContent value="sleep" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sleep Overview</CardTitle>
                <CardDescription>Monitor your sleep patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{getAverageSleep()}h</div>
                  <div className="text-sm text-muted-foreground">Average Sleep</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-semibold">{sleepEntries.length}</div>
                    <div className="text-sm text-muted-foreground">Nights Logged</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-semibold">
                      {sleepEntries.length > 0 ? Math.max(...sleepEntries.map((e) => e.duration)).toFixed(1) : "0"}h
                    </div>
                    <div className="text-sm text-muted-foreground">Longest Sleep</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{editingSleep ? "Edit Sleep Entry" : "Log Sleep"}</CardTitle>
                <CardDescription>Record your sleep duration and quality</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Bedtime</Label>
                    <Input
                      id="start-time"
                      type="time"
                      value={newStartTime}
                      onChange={(e) => setNewStartTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time">Wake Time</Label>
                    <Input
                      id="end-time"
                      type="time"
                      value={newEndTime}
                      onChange={(e) => setNewEndTime(e.target.value)}
                    />
                  </div>
                </div>

                {newStartTime && newEndTime && (
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-semibold">
                      {calculateSleepDuration(newStartTime, newEndTime).toFixed(1)}h
                    </div>
                    <div className="text-sm text-muted-foreground">Sleep Duration</div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="sleep-quality">Sleep Quality</Label>
                  <Select
                    value={newSleepQuality}
                    onValueChange={(value: "poor" | "fair" | "good" | "excellent") => setNewSleepQuality(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="poor">Poor</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="excellent">Excellent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sleep-notes">Notes (optional)</Label>
                  <Textarea
                    id="sleep-notes"
                    placeholder="How did you sleep?"
                    value={newSleepNotes}
                    onChange={(e) => setNewSleepNotes(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={editingSleep ? updateSleepEntry : addSleepEntry} className="flex-1">
                    <Clock className="h-4 w-4 mr-2" />
                    {editingSleep ? "Update Sleep" : "Log Sleep"}
                  </Button>
                  {editingSleep && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingSleep(null)
                        resetSleepForm()
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sleep History</CardTitle>
              <CardDescription>Your recent sleep entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {sleepEntries
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{entry.duration.toFixed(1)}h sleep</span>
                          <Badge
                            variant={
                              entry.quality === "excellent"
                                ? "default"
                                : entry.quality === "good"
                                  ? "secondary"
                                  : entry.quality === "fair"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {entry.quality}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatTime(entry.startTime)} - {formatTime(entry.endTime)} • {entry.date}
                        </div>
                        {entry.notes && <div className="text-sm text-muted-foreground mt-1">{entry.notes}</div>}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => editSleepEntry(entry)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteSleepEntry(entry.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Best Records Tab */}
        <TabsContent value="records" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{editingRecord ? "Edit Record" : "Add Personal Best"}</CardTitle>
                <CardDescription>Track your achievements and milestones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="record-category">Category</Label>
                  <Input
                    id="record-category"
                    placeholder="e.g., Push-ups, Weight, 5K Run"
                    value={newRecordCategory}
                    onChange={(e) => setNewRecordCategory(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="record-value">Value</Label>
                    <Input
                      id="record-value"
                      type="number"
                      step="0.1"
                      placeholder="50"
                      value={newRecordValue}
                      onChange={(e) => setNewRecordValue(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="record-unit">Unit</Label>
                    <Input
                      id="record-unit"
                      placeholder="reps, kg, minutes"
                      value={newRecordUnit}
                      onChange={(e) => setNewRecordUnit(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="record-notes">Notes (optional)</Label>
                  <Textarea
                    id="record-notes"
                    placeholder="Additional details about this achievement..."
                    value={newRecordNotes}
                    onChange={(e) => setNewRecordNotes(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={editingRecord ? updateBestRecord : addBestRecord} className="flex-1">
                    <Trophy className="h-4 w-4 mr-2" />
                    {editingRecord ? "Update Record" : "Add Record"}
                  </Button>
                  {editingRecord && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingRecord(null)
                        resetRecordForm()
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Records Overview</CardTitle>
                <CardDescription>Your personal achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600">{bestRecords.length}</div>
                  <div className="text-sm text-muted-foreground">Personal Records</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Personal Bests</CardTitle>
              <CardDescription>All your recorded achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bestRecords.map((record) => (
                  <div key={record.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold">{record.category}</h4>
                        <div className="text-2xl font-bold text-primary">
                          {record.value} {record.unit}
                        </div>
                        <div className="text-sm text-muted-foreground">{record.date}</div>
                        {record.previousBest && (
                          <div className="text-sm text-green-600">
                            +{(record.value - record.previousBest).toFixed(1)} improvement
                          </div>
                        )}
                        {record.notes && <div className="text-sm text-muted-foreground mt-2">{record.notes}</div>}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => editRecord(record)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteRecord(record.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      <Trophy className="h-3 w-3 mr-1" />
                      Personal Best
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BMI Calculator Tab */}
        <TabsContent value="bmi" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>BMI Calculator</CardTitle>
                <CardDescription>Calculate your Body Mass Index</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="70.5"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>

                <Button onClick={calculateBMI} className="w-full">
                  <Scale className="h-4 w-4 mr-2" />
                  Calculate BMI
                </Button>

                {bmi && (
                  <div className="text-center p-6 bg-muted rounded-lg space-y-3">
                    <div className="text-3xl font-bold">{bmi.toFixed(1)}</div>
                    <Badge className={getBMICategory(bmi).color}>{getBMICategory(bmi).category}</Badge>
                    <div className="text-xs text-muted-foreground">
                      BMI Categories: {"<18.5 Underweight • 18.5-24.9 Normal • 25-29.9 Overweight • ≥30 Obese"}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>BMI History</CardTitle>
                <CardDescription>Track your BMI changes over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {bmiHistory
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((entry, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">BMI: {entry.bmi.toFixed(1)}</div>
                          <div className="text-sm text-muted-foreground">
                            Weight: {entry.weight}kg • {entry.date}
                          </div>
                        </div>
                        <Badge className={getBMICategory(entry.bmi).color}>{getBMICategory(entry.bmi).category}</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
