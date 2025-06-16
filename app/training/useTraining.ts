import { useState, useEffect } from "react";
import {
  getExercises,
  getTrainingSessions,
  saveTrainingSession,
  getTrainingProgress,
  getRoutines,
  createRoutine,
  createExercise,
} from "./service";
import { Exercise, TrainingSession, TrainingSet, TrainingProgressEntry, Routine } from "./types";

export function useTraining() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [progressData, setProgressData] = useState<TrainingProgressEntry[]>([]);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load exercises + sessions + routines
  useEffect(() => {
    const load = async () => {
      try {
        const [ex, se, ro] = await Promise.all([
          getExercises(),
          getTrainingSessions(),
          getRoutines(),
        ]);
        setExercises(ex);
        setSessions(se);
        setRoutines(ro);
      } catch (err) {
        console.error(err);
        setError("Failed to load training data.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Load progress
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const progress = await getTrainingProgress();
        setProgressData(progress);
      } catch (err) {
        console.error(err);
        setError("Failed to load training progress.");
      }
    };

    loadProgress();
  }, []);

  const createSession = async (
    date: string,
    sets: TrainingSet[],
    title?: string,
    notes?: string
  ) => {
    try {
      const newSession = await saveTrainingSession({
        userId: "user1",
        date,
        sets,
        title,
        notes,
      });
      setSessions((prev) => [...prev, newSession]);
      return newSession;
    } catch (err) {
      setError("Failed to save training session.");
      throw err;
    }
  };

  const getProgress = (): TrainingProgressEntry[] => {
    return progressData;
  };

  const getExerciseName = (id: string) => {
    const exercise = exercises.find((ex) => ex.id === id);
    return exercise ? exercise.name : "Unknown";
  };

  const createNewExercise = async (exercise: Omit<Exercise, "id">) => {
    try {
      const newExercise = await createExercise(exercise);
      setExercises((prev) => [...prev, newExercise]);
      return newExercise;
    } catch (err) {
      setError("Failed to create exercise.");
      throw err;
    }
  };

  const createNewRoutine = async (routine: Omit<Routine, "id" | "createdAt" | "updatedAt">) => {
    try {
      const newRoutine = await createRoutine(routine);
      setRoutines((prev) => [...prev, newRoutine]);
      return newRoutine;
    } catch (err) {
      setError("Failed to create routine.");
      throw err;
    }
  };

  const getRoutineExercises = (routineId: string): Exercise[] => {
    const routine = routines.find((r) => r.id === routineId);
    if (!routine) return [];
    
    return routine.exercises
      .sort((a, b) => a.order - b.order)
      .map((ex) => exercises.find((e) => e.id === ex.exerciseId))
      .filter((ex): ex is Exercise => ex !== undefined);
  };

  return {
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
  };
}
