// app/training/page.tsx
"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { BellOff, Home, Pencil, Plus, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Exercise, Reminder, TrainingSet } from "./types";
import { useReminders } from "./useReminders";
import { useTraining } from "./useTraining";

export default function TrainingPage() {
  // First, declare all authentication and session-related hooks
  const { data: session, status } = useSession();

  // Then, declare all state hooks
  const [date, setDate] = useState<Date>(new Date());
  const [currentExercise, setCurrentExercise] = useState<string>("");
  const [repetitions, setRepetitions] = useState<number>(0);
  const [currentSession, setCurrentSession] = useState<TrainingSet[]>([]);
  const [activeTab, setActiveTab] = useState<string>("new");
  const [sessionTitle, setSessionTitle] = useState<string>("");
  const [sessionNotes, setSessionNotes] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [reminderType, setReminderType] = useState<string>("training");
  const [reminderDate, setReminderDate] = useState<Date>(new Date());
  const [reminderHour, setReminderHour] = useState<string>("12");
  const [reminderMessage, setReminderMessage] = useState<string>("");
  const [newExerciseName, setNewExerciseName] = useState("");
  const [newExerciseCategory, setNewExerciseCategory] = useState("");
  const [newExerciseDescription, setNewExerciseDescription] = useState("");
  const [newRoutineName, setNewRoutineName] = useState("");
  const [newRoutineDescription, setNewRoutineDescription] = useState("");
  const [selectedRoutineExercises, setSelectedRoutineExercises] = useState<
    string[]
  >([]);
  const [isCreatingExercise, setIsCreatingExercise] = useState(false);
  const [isCreatingRoutine, setIsCreatingRoutine] = useState(false);

  // After authentication check, declare custom hooks
  const {
    exercises,
    sessions,
    routines,
    loading,
    error,
    createSession,
    getProgress,
    getExerciseName,
    createNewExercise,
    createNewRoutine,
    getRoutineExercises,
  } = useTraining();

  const {
    reminders,
    saveReminder,
    deleteReminder,
    editReminder,
    notificationPermission,
    requestNotificationPermission,
  } = useReminders(session?.user?.id || "");

  // Early returns for loading and authentication
  if (status === "loading") {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">FootyTracker Training</h1>
          <Link href="/">
            <Button
              variant="outline"
              className="gap-2 bg-background hover:bg-background/90 text-foreground"
            >
              <Home className="h-5 w-5" />
              Return to Home
            </Button>
          </Link>
        </div>
        <p>Loading session...</p>
      </div>
    );
  }

  if (!session?.user?.id) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">FootyTracker Training</h1>
          <Link href="/">
            <Button
              variant="outline"
              className="gap-2 bg-background hover:bg-background/90 text-foreground"
            >
              <Home className="h-5 w-5" />
              Return to Home
            </Button>
          </Link>
        </div>
        <p>You must be logged in.</p>
      </div>
    );
  }

  const progressData = getProgress();

  const addExerciseToSession = () => {
    if (!currentExercise || repetitions <= 0) return;

    setCurrentSession([
      ...currentSession,
      { exerciseId: currentExercise, repetitions },
    ]);

    setCurrentExercise("");
    setRepetitions(0);
  };

  const saveSession = async () => {
    if (currentSession.length === 0) return;

    try {
      setIsSaving(true);
      await createSession(
        format(date, "yyyy-MM-dd"),
        currentSession,
        sessionTitle || `Training on ${format(date, "MMM d")}`,
        sessionNotes
      );

      setCurrentSession([]);
      setSessionTitle("");
      setSessionNotes("");
      setActiveTab("history");
    } catch (err) {
      console.error("Failed to save session:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const renderExerciseCategories = () => {
    const categories = [...new Set(exercises.map((ex) => ex.category))];

    return categories.map((category) => (
      <div key={category} className="mb-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">
          {category}
        </h3>
        <div className="space-y-1">
          {exercises
            .filter((ex) => ex.category === category)
            .map((exercise) => (
              <SelectItem key={exercise.id} value={exercise.id}>
                {exercise.name}
              </SelectItem>
            ))}
        </div>
      </div>
    ));
  };

  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">FootyTracker Training</h1>
          <Link href="/">
            <Button
              variant="outline"
              className="gap-2 bg-background hover:bg-background/90 text-foreground"
            >
              <Home className="h-5 w-5" />
              Return to Home
            </Button>
          </Link>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-12 w-full max-w-md" />
          <div className="grid md:grid-cols-2 gap-6">
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">FootyTracker Training</h1>
          <Link href="/">
            <Button
              variant="outline"
              className="gap-2 bg-background hover:bg-background/90 text-foreground"
            >
              <Home className="h-5 w-5" />
              Return to Home
            </Button>
          </Link>
        </div>
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">FootyTracker Training</h1>
        <Link href="/">
          <Button
            variant="outline"
            className="gap-2 bg-background hover:bg-background/90 text-foreground"
          >
            <Home className="h-5 w-5" />
            Return to Home
          </Button>
        </Link>
      </div>

      <Tabs
        defaultValue="new"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-6"
      >
        <TabsList className="grid grid-cols-5 w-full max-w-lg mb-6">
          <TabsTrigger value="new">New Session</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
          <TabsTrigger value="routines">Routines</TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Training Session</CardTitle>
                <CardDescription>
                  Record your training exercises and repetitions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Session Title (Optional)</Label>
                    <Input
                      id="title"
                      placeholder="E.g., Morning Training"
                      value={sessionTitle}
                      onChange={(e) => setSessionTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="routine">Select Routine (Optional)</Label>
                    <Select
                      value=""
                      onValueChange={(routineId) => {
                        if (routineId) {
                          const routineExercises =
                            getRoutineExercises(routineId);
                          setCurrentSession(
                            routineExercises.map((exercise) => ({
                              exerciseId: exercise.id,
                              repetitions: 0,
                            }))
                          );
                        }
                      }}
                    >
                      <SelectTrigger id="routine">
                        <SelectValue placeholder="Select a routine" />
                      </SelectTrigger>
                      <SelectContent>
                        {routines.map((routine) => (
                          <SelectItem key={routine.id} value={routine.id}>
                            {routine.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 ">
                    <Label htmlFor="date" className="block text-center mb-10">
                      Training Date
                    </Label>
                    <div className="flex justify-center">
                      <div className="scale-110">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(day: Date | undefined) =>
                            day && setDate(day)
                          }
                          className="rounded-md border"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="exercise">Exercise</Label>
                      <Select
                        value={currentExercise}
                        onValueChange={setCurrentExercise}
                      >
                        <SelectTrigger id="exercise">
                          <SelectValue placeholder="Select exercise" />
                        </SelectTrigger>
                        <SelectContent>
                          {renderExerciseCategories()}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="repetitions">Repetitions</Label>
                      <Input
                        id="repetitions"
                        type="number"
                        min="1"
                        value={repetitions || ""}
                        onChange={(e) =>
                          setRepetitions(parseInt(e.target.value) || 0)
                        }
                      />
                    </div>
                  </div>
                  <Button
                    onClick={addExerciseToSession}
                    disabled={!currentExercise || repetitions <= 0}
                  >
                    Add Exercise
                  </Button>
                </div>

                <div className="mt-6 space-y-2">
                  <Label htmlFor="notes">Session Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any notes about this training session"
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Session</CardTitle>
                <CardDescription>
                  {currentSession.length === 0
                    ? "No exercises added yet"
                    : `${currentSession.length} exercise${
                        currentSession.length > 1 ? "s" : ""
                      } added`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentSession.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">
                      Add exercises to start your training session
                    </p>
                  </div>
                ) : (
                  <ScrollArea className="h-72">
                    <div className="space-y-4">
                      {currentSession.map((set, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between border-b pb-2"
                        >
                          <div>
                            <p className="font-medium">
                              {getExerciseName(set.exerciseId)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              min="0"
                              value={set.repetitions || ""}
                              onChange={(e) => {
                                const newSession = [...currentSession];
                                newSession[index] = {
                                  ...set,
                                  repetitions: parseInt(e.target.value) || 0,
                                };
                                setCurrentSession(newSession);
                              }}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">
                              reps
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newSession = [...currentSession];
                                newSession.splice(index, 1);
                                setCurrentSession(newSession);
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={saveSession}
                  disabled={
                    currentSession.length === 0 ||
                    isSaving ||
                    currentSession.some((set) => set.repetitions <= 0)
                  }
                >
                  {isSaving ? "Saving..." : "Save Training Session"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Training History</CardTitle>
              <CardDescription>
                View your past training sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sessions.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground">
                    No training sessions recorded yet
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setActiveTab("new")}
                  >
                    Create Your First Session
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {sessions
                    .sort(
                      (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                    .map((session) => (
                      <Card key={session.id} className="bg-muted/40">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <CardTitle className="text-lg">
                                {session.title ||
                                  format(
                                    new Date(session.date),
                                    "MMMM d, yyyy"
                                  )}
                              </CardTitle>
                              <CardDescription>
                                {format(
                                  new Date(session.date),
                                  "EEEE, MMMM d, yyyy"
                                )}
                              </CardDescription>
                            </div>
                            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm">
                              {session.sets.length} exercises
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {session.sets.map((set, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between items-center py-1 border-b border-border/50"
                              >
                                <span>{getExerciseName(set.exerciseId)}</span>
                                <span className="font-medium">
                                  {set.repetitions} reps
                                </span>
                              </div>
                            ))}

                            {session.notes && (
                              <div className="mt-4 pt-2 border-t">
                                <p className="text-sm text-muted-foreground">
                                  {session.notes}
                                </p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Training Progress</CardTitle>
              <CardDescription>
                Analyze how your performance has developed over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              {progressData.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground">
                    Not enough data to show progress yet
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Complete more training sessions to see your progress
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setActiveTab("new")}
                  >
                    Add a Training Session
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={progressData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="exercise" />
                        <YAxis
                          label={{
                            value: "Repetitions",
                            angle: -90,
                            position: "insideLeft",
                          }}
                        />
                        <Tooltip />
                        <Legend />
                        {sessions.map((session) => {
                          const dateLabel = format(
                            new Date(session.date),
                            "MMM dd"
                          );
                          // Generate a consistent color based on the date string
                          const color = `hsl(${
                            (dateLabel.charCodeAt(0) * 5) % 360
                          }, 70%, 50%)`;

                          return (
                            <Line
                              key={dateLabel}
                              type="monotone"
                              dataKey={dateLabel}
                              stroke={color}
                              activeDot={{ r: 8 }}
                            />
                          );
                        })}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {progressData.map((exerciseData, index) => {
                      const exerciseName = exerciseData.exercise;
                      // Remove the exercise name key to get just the data points
                      const { exercise, ...dataPoints } = exerciseData;
                      const dataEntries = Object.entries(dataPoints);

                      if (dataEntries.length < 2) return null;

                      // Calculate improvement
                      const firstValue = parseInt(dataEntries[0][1] as string);
                      const lastValue = parseInt(
                        dataEntries[dataEntries.length - 1][1] as string
                      );
                      const improvement = lastValue - firstValue;
                      const percentageImprovement = (
                        ((lastValue - firstValue) / firstValue) *
                        100
                      ).toFixed(1);

                      return (
                        <Card key={index} className="bg-muted/40">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">
                              {exerciseName}
                            </CardTitle>
                            <CardDescription>
                              {improvement >= 0 ? (
                                <span className="text-green-500">
                                  Improved by {improvement} reps (
                                  {percentageImprovement}%)
                                </span>
                              ) : (
                                <span className="text-red-500">
                                  Decreased by {Math.abs(improvement)} reps (
                                  {Math.abs(parseFloat(percentageImprovement))}
                                  %)
                                </span>
                              )}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {dataEntries.map(([date, value], idx) => (
                                <div
                                  key={idx}
                                  className="flex justify-between items-center py-1 border-b border-border/50"
                                >
                                  <span>{date}</span>
                                  <span className="font-medium">
                                    {value} reps
                                  </span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminders">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Set Reminders</CardTitle>
                <CardDescription>
                  Create reminders for your training activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {notificationPermission !== "granted" && (
                    <Alert>
                      <AlertDescription className="flex items-center gap-2">
                        <BellOff className="h-4 w-4" />
                        Notifications are{" "}
                        {notificationPermission === "denied"
                          ? "blocked"
                          : "not enabled"}
                        .
                        {notificationPermission !== "denied" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={requestNotificationPermission}
                          >
                            Enable Notifications
                          </Button>
                        )}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label>Reminder Type</Label>
                    <Select
                      value={reminderType}
                      onValueChange={setReminderType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select reminder type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hydration">Hydration</SelectItem>
                        <SelectItem value="stretching">Stretching</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date</Label>
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={reminderDate}
                        onSelect={(day: Date | undefined) =>
                          day && setReminderDate(day)
                        }
                        className="rounded-md border"
                        disabled={(date) => date < new Date()}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Time (Hour)</Label>
                    <Select
                      value={reminderHour}
                      onValueChange={setReminderHour}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select hour" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem
                            key={i}
                            value={i.toString().padStart(2, "0")}
                          >
                            {i.toString().padStart(2, "0")}:00
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Message (Optional)</Label>
                    <Textarea
                      placeholder="Add a custom message for your reminder"
                      value={reminderMessage}
                      onChange={(e) => setReminderMessage(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => {
                      if (!reminderType || !reminderDate || !reminderHour)
                        return;

                      const formattedDate = reminderDate
                        .toISOString()
                        .split("T")[0];
                      saveReminder({
                        type: reminderType as Reminder["type"],
                        date: formattedDate,
                        hour: reminderHour,
                        message: reminderMessage,
                      });

                      // Reset form
                      setReminderType("training");
                      setReminderDate(new Date());
                      setReminderHour("12");
                      setReminderMessage("");
                    }}
                  >
                    Set Reminder
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Your Reminders</CardTitle>
                <CardDescription>
                  Manage your upcoming reminders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {" "}
                    {reminders
                      .sort((a, b) => {
                        try {
                          const dateA = new Date(`${a.date}T${a.hour}:00:00`);
                          const dateB = new Date(`${b.date}T${b.hour}:00:00`);
                          if (
                            isNaN(dateA.getTime()) ||
                            isNaN(dateB.getTime())
                          ) {
                            // Fallback to string comparison if dates are invalid
                            return (
                              a.date.localeCompare(b.date) ||
                              a.hour.localeCompare(b.hour)
                            );
                          }
                          return dateA.getTime() - dateB.getTime();
                        } catch (e) {
                          console.error("Sorting error:", e);
                          return 0;
                        }
                      })
                      .map((reminder) => {
                        const dateStr = `${reminder.date}T${reminder.hour}:00:00`;
                        const reminderDate = new Date(dateStr);
                        const isPast = reminderDate < new Date();

                        let formattedDate;
                        try {
                          formattedDate = format(
                            reminderDate,
                            "EEEE, MMMM d, yyyy"
                          );
                        } catch (e) {
                          console.error("Date formatting error:", e);
                          formattedDate = reminder.date;
                        }

                        return (
                          <Card
                            key={reminder.id}
                            className={`bg-muted/40 ${
                              reminder.isCompleted || isPast ? "opacity-50" : ""
                            }`}
                          >
                            <CardHeader className="py-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <CardTitle className="text-base capitalize">
                                    {reminder.type}
                                  </CardTitle>
                                  <CardDescription>
                                    {formattedDate} at {reminder.hour}:00
                                  </CardDescription>
                                </div>
                                <div className="flex gap-2">
                                  {!reminder.isCompleted && !isPast && (
                                    <>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                          setReminderType(reminder.type);
                                          setReminderDate(
                                            new Date(reminder.date)
                                          );
                                          setReminderHour(reminder.hour);
                                          setReminderMessage(
                                            reminder.message || ""
                                          );
                                          deleteReminder(reminder.id);
                                        }}
                                      >
                                        <Pencil className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          deleteReminder(reminder.id)
                                        }
                                      >
                                        <Trash className="h-4 w-4" />
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </div>
                            </CardHeader>
                            {reminder.message && (
                              <CardContent className="py-2">
                                <p className="text-sm text-muted-foreground">
                                  {reminder.message}
                                </p>
                              </CardContent>
                            )}
                          </Card>
                        );
                      })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="routines">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Your Routines</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        New Routine
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Routine</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="routineName">Routine Name</Label>
                          <Input
                            id="routineName"
                            value={newRoutineName}
                            onChange={(e) => setNewRoutineName(e.target.value)}
                            placeholder="E.g., Morning Warm-up"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="routineDescription">
                            Description (Optional)
                          </Label>
                          <Textarea
                            id="routineDescription"
                            value={newRoutineDescription}
                            onChange={(e) =>
                              setNewRoutineDescription(e.target.value)
                            }
                            placeholder="Describe your routine..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Exercises</Label>
                          <ScrollArea className="h-48 border rounded-md p-4">
                            <div className="space-y-2">
                              {exercises.map((exercise) => (
                                <div
                                  key={exercise.id}
                                  className="flex items-center space-x-2"
                                >
                                  <input
                                    type="checkbox"
                                    id={`exercise-${exercise.id}`}
                                    checked={selectedRoutineExercises.includes(
                                      exercise.id
                                    )}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedRoutineExercises([
                                          ...selectedRoutineExercises,
                                          exercise.id,
                                        ]);
                                      } else {
                                        setSelectedRoutineExercises(
                                          selectedRoutineExercises.filter(
                                            (id) => id !== exercise.id
                                          )
                                        );
                                      }
                                    }}
                                  />
                                  <label htmlFor={`exercise-${exercise.id}`}>
                                    {exercise.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </div>
                        <Button
                          className="w-full"
                          onClick={async () => {
                            try {
                              setIsCreatingRoutine(true);
                              await createNewRoutine({
                                userId: session?.user?.id || "user1",
                                name: newRoutineName,
                                description: newRoutineDescription,
                                exercises: selectedRoutineExercises.map(
                                  (id, index) => ({
                                    exerciseId: id,
                                    order: index,
                                  })
                                ),
                              });
                              setNewRoutineName("");
                              setNewRoutineDescription("");
                              setSelectedRoutineExercises([]);
                            } catch (err) {
                              console.error("Failed to create routine:", err);
                            } finally {
                              setIsCreatingRoutine(false);
                            }
                          }}
                          disabled={
                            !newRoutineName ||
                            selectedRoutineExercises.length === 0 ||
                            isCreatingRoutine
                          }
                        >
                          {isCreatingRoutine ? "Creating..." : "Create Routine"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {routines.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">
                      No routines created yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {routines.map((routine) => (
                      <Card key={routine.id} className="bg-muted/40">
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {routine.name}
                          </CardTitle>
                          {routine.description && (
                            <CardDescription>
                              {routine.description}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {getRoutineExercises(routine.id).map(
                              (exercise, index) => (
                                <div
                                  key={exercise.id}
                                  className="flex items-center space-x-2"
                                >
                                  <span className="text-muted-foreground">
                                    {index + 1}.
                                  </span>
                                  <span>{exercise.name}</span>
                                </div>
                              )
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <div className="flex justify-between items-center pr-4">
                <CardHeader>
                  <CardTitle>Exercises</CardTitle>
                </CardHeader>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Exercise
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Exercise</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="exerciseName">Exercise Name</Label>
                        <Input
                          id="exerciseName"
                          value={newExerciseName}
                          onChange={(e) => setNewExerciseName(e.target.value)}
                          placeholder="E.g., Jumping Jacks"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="exerciseCategory">Category</Label>
                        <Input
                          id="exerciseCategory"
                          value={newExerciseCategory}
                          onChange={(e) =>
                            setNewExerciseCategory(e.target.value)
                          }
                          placeholder="E.g., Cardio"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="exerciseDescription">
                          Description (Optional)
                        </Label>
                        <Textarea
                          id="exerciseDescription"
                          value={newExerciseDescription}
                          onChange={(e) =>
                            setNewExerciseDescription(e.target.value)
                          }
                          placeholder="Describe the exercise..."
                        />
                      </div>
                      <Button
                        className="w-full"
                        onClick={async () => {
                          try {
                            setIsCreatingExercise(true);
                            await createNewExercise({
                              name: newExerciseName,
                              category: newExerciseCategory,
                              description: newExerciseDescription,
                              createdBy: session?.user?.id || "user1",
                            });
                            setNewExerciseName("");
                            setNewExerciseCategory("");
                            setNewExerciseDescription("");
                          } catch (err) {
                            console.error("Failed to create exercise:", err);
                          } finally {
                            setIsCreatingExercise(false);
                          }
                        }}
                        disabled={
                          !newExerciseName ||
                          !newExerciseCategory ||
                          isCreatingExercise
                        }
                      >
                        {isCreatingExercise ? "Creating..." : "Create Exercise"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(
                    exercises.reduce((acc: Record<string, Exercise[]>, ex) => {
                      if (!acc[ex.category]) acc[ex.category] = [];
                      acc[ex.category].push(ex);
                      return acc;
                    }, {})
                  ).map(([category, categoryExercises]) => (
                    <div key={category}>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        {category}
                      </h3>
                      <div className="space-y-2">
                        {categoryExercises.map((exercise) => (
                          <div
                            key={exercise.id}
                            className="flex items-center justify-between p-2 bg-muted/40 rounded-md"
                          >
                            <div>
                              <p className="font-medium">{exercise.name}</p>
                              {exercise.description && (
                                <p className="text-sm text-muted-foreground">
                                  {exercise.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
