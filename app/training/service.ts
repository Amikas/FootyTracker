// services/trainingService.ts
import { Exercise, TrainingSession, TrainingSet } from "./types";

// In a real application, these functions would make API calls to your backend
// For now, we'll use localStorage for demo purposes

const STORAGE_KEY = "footytracker_data";

// Initialize some demo data
const initializeData = () => {
  if (typeof window === "undefined") return;
  
  if (!localStorage.getItem(STORAGE_KEY)) {
    const initialData = {
      exercises: [
        { id: "ex1", name: "Dribbling", category: "Ball Control", description: "Practice ball control with cones" },
        { id: "ex2", name: "Passing", category: "Technique", description: "Short and long passing drills" },
        { id: "ex3", name: "Shooting", category: "Attacking", description: "Practice shooting from different angles" },
        { id: "ex4", name: "Headers", category: "Aerial", description: "Practice heading technique" },
        { id: "ex5", name: "Sprints", category: "Fitness", description: "Short sprints to build speed" },
        { id: "ex6", name: "Juggling", category: "Ball Control", description: "Improve ball control with juggling" },
        { id: "ex7", name: "Agility Ladder", category: "Fitness", description: "Footwork drills with agility ladder" },
        { id: "ex8", name: "Penalty Kicks", category: "Set Pieces", description: "Practice penalty kicks" },
      ],
      sessions: [
        {
          id: "t1",
          userId: "user1",
          date: "2025-04-20",
          title: "Morning Training",
          sets: [
            { exerciseId: "ex1", repetitions: 20 },
            { exerciseId: "ex3", repetitions: 15 },
            { exerciseId: "ex5", repetitions: 10 },
          ],
          createdAt: new Date().toISOString(),
        },
        {
          id: "t2",
          userId: "user1",
          date: "2025-04-22",
          title: "Evening Session",
          sets: [
            { exerciseId: "ex1", repetitions: 25 },
            { exerciseId: "ex3", repetitions: 18 },
            { exerciseId: "ex5", repetitions: 12 },
          ],
          createdAt: new Date().toISOString(),
        },
        {
          id: "t3",
          userId: "user1",
          date: "2025-04-24",
          title: "Weekend Training",
          sets: [
            { exerciseId: "ex1", repetitions: 30 },
            { exerciseId: "ex3", repetitions: 20 },
            { exerciseId: "ex5", repetitions: 15 },
          ],
          createdAt: new Date().toISOString(),
        },
      ]
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  }
};

// Get all exercises
export const getExercises = (): Exercise[] => {
  if (typeof window === "undefined") return [];
  
  initializeData();
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  return data.exercises || [];
};

// Get all training sessions
export const getTrainingSessions = (): TrainingSession[] => {
  if (typeof window === "undefined") return [];
  
  initializeData();
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  return data.sessions || [];
};

// Save a new training session
export const saveTrainingSession = (session: Omit<TrainingSession, "id" | "createdAt">): TrainingSession => {
  if (typeof window === "undefined") throw new Error("Cannot access storage");
  
  initializeData();
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  
  const newSession: TrainingSession = {
    ...session,
    id: `t${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  data.sessions = [...(data.sessions || []), newSession];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  
  return newSession;
};

// Get an exercise by ID
export const getExerciseById = (id: string): Exercise | undefined => {
  const exercises = getExercises();
  return exercises.find(ex => ex.id === id);
};

// Get training progress data
export const getTrainingProgress = () => {
  const sessions = getTrainingSessions();
  const exercises = getExercises();
  
  const progressData: Record<string, { exercise: string; [key: string]: any }> = {};
  
  // Initialize with exercise names
  exercises.forEach(ex => {
    progressData[ex.id] = { exercise: ex.name };
  });
  
  // Populate with session data
  sessions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  sessions.forEach(session => {
    const dateKey = new Date(session.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    
    session.sets.forEach(set => {
      if (progressData[set.exerciseId]) {
        progressData[set.exerciseId][dateKey] = set.repetitions;
      }
    });
  });
  
  return Object.values(progressData).filter(
    ex => Object.keys(ex).length > 1 // Only include exercises that have training data
  );
};