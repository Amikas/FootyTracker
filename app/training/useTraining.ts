import { useState, useEffect } from "react";
import {
  getExercises,
  getTrainingSessions,
  saveTrainingSession,
  getTrainingProgress,
} from "./service";
import { Exercise, TrainingSession, TrainingSet, TrainingProgressEntry } from "./types";

export function useTraining() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [progressData, setProgressData] = useState<TrainingProgressEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load exercises + sessions
  useEffect(() => {
    const load = async () => {
      try {
        const [ex, se] = await Promise.all([
          getExercises(),
          getTrainingSessions(),
        ]);
        setExercises(ex);
        setSessions(se);
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

  return {
    exercises,
    sessions,
    loading,
    error,
    createSession,
    getProgress,
    getExerciseName,
  };
}
