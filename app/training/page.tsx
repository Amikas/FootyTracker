// app/training/page.tsx
"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrainingSet } from "./types";
import { useTraining } from "./useTraining";

export default function TrainingPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [currentExercise, setCurrentExercise] = useState<string>("");
  const [repetitions, setRepetitions] = useState<number>(0);
  const [currentSession, setCurrentSession] = useState<TrainingSet[]>([]);
  const [activeTab, setActiveTab] = useState<string>("new");
  const [sessionTitle, setSessionTitle] = useState<string>("");
  const [sessionNotes, setSessionNotes] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  const { 
    exercises, 
    sessions, 
    loading, 
    error, 
    createSession,
    getProgress,
    getExerciseName 
  } = useTraining();

  const progressData = getProgress();

  const addExerciseToSession = () => {
    if (!currentExercise || repetitions <= 0) return;
    
    setCurrentSession([
      ...currentSession,
      { exerciseId: currentExercise, repetitions }
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
    const categories = [...new Set(exercises.map(ex => ex.category))];
    
    return categories.map(category => (
      <div key={category} className="mb-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">{category}</h3>
        <div className="space-y-1">
          {exercises
            .filter(ex => ex.category === category)
            .map(exercise => (
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
        <h1 className="text-3xl font-bold mb-6">FootyTracker Training</h1>
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
        <h1 className="text-3xl font-bold mb-6">FootyTracker Training</h1>
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">FootyTracker Training</h1>

      <Tabs defaultValue="new" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="new">New Session</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Training Session</CardTitle>
                <CardDescription>Record your training exercises and repetitions</CardDescription>
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
                    <Label htmlFor="date">Training Date</Label>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      className="rounded-md border"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="exercise">Exercise</Label>
                      <Select value={currentExercise} onValueChange={setCurrentExercise}>
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
                        onChange={(e) => setRepetitions(parseInt(e.target.value) || 0)}
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
                    : `${currentSession.length} exercise${currentSession.length > 1 ? 's' : ''} added`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentSession.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Add exercises to start your training session</p>
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
                            <p className="font-medium">{getExerciseName(set.exerciseId)}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{set.repetitions} reps</span>
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
                  disabled={currentSession.length === 0 || isSaving}
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
              <CardDescription>View your past training sessions</CardDescription>
            </CardHeader>
            <CardContent>
              {sessions.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground">No training sessions recorded yet</p>
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
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((session) => (
                    <Card key={session.id} className="bg-muted/40">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle className="text-lg">{session.title || format(new Date(session.date), "MMMM d, yyyy")}</CardTitle>
                            <CardDescription>{format(new Date(session.date), "EEEE, MMMM d, yyyy")}</CardDescription>
                          </div>
                          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm">
                            {session.sets.length} exercises
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {session.sets.map((set, idx) => (
                            <div key={idx} className="flex justify-between items-center py-1 border-b border-border/50">
                              <span>{getExerciseName(set.exerciseId)}</span>
                              <span className="font-medium">{set.repetitions} reps</span>
                            </div>
                          ))}
                          
                          {session.notes && (
                            <div className="mt-4 pt-2 border-t">
                              <p className="text-sm text-muted-foreground">{session.notes}</p>
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
              <CardDescription>Analyze how your performance has developed over time</CardDescription>
            </CardHeader>
            <CardContent>
              {progressData.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground">Not enough data to show progress yet</p>
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
                        <YAxis label={{ value: 'Repetitions', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        {sessions.map((session) => {
                          const dateLabel = format(new Date(session.date), "MMM dd");
                          // Generate a consistent color based on the date string
                          const color = `hsl(${(dateLabel.charCodeAt(0) * 5) % 360}, 70%, 50%)`;
                          
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
                      const lastValue = parseInt(dataEntries[dataEntries.length - 1][1] as string);
                      const improvement = lastValue - firstValue;
                      const percentageImprovement = ((lastValue - firstValue) / firstValue * 100).toFixed(1);
                      
                      return (
                        <Card key={index} className="bg-muted/40">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{exerciseName}</CardTitle>
                            <CardDescription>
                              {improvement >= 0 ? (
                                <span className="text-green-500">
                                  Improved by {improvement} reps ({percentageImprovement}%)
                                </span>
                              ) : (
                                <span className="text-red-500">
                                  Decreased by {Math.abs(improvement)} reps ({Math.abs(parseFloat(percentageImprovement))}%)
                                </span>
                              )}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {dataEntries.map(([date, value], idx) => (
                                <div key={idx} className="flex justify-between items-center py-1 border-b border-border/50">
                                  <span>{date}</span>
                                  <span className="font-medium">{value} reps</span>
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
      </Tabs>
    </div>
  );
}