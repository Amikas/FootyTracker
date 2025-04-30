// hooks/useTraining.ts
import { useState, useEffect } from 'react';
import { 
  getExercises, 
  getTrainingSessions, 
  saveTrainingSession, 
  getTrainingProgress 
} from './service';
import { Exercise, TrainingSession, TrainingSet } from './types';

export function useTraining() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load exercises and sessions
  useEffect(() => {
    try {
      const loadedExercises = getExercises();
      const loadedSessions = getTrainingSessions();
      
      setExercises(loadedExercises);
      setSessions(loadedSessions);
      setLoading(false);
    } catch (err) {
      setError('Failed to load training data');
      setLoading(false);
    }
  }, []);

  // Create a new training session
  const createSession = async (date: string, sets: TrainingSet[], title?: string, notes?: string) => {
    try {
      const newSession = saveTrainingSession({
        userId: 'user1', // In a real app, you'd get this from authentication
        date,
        sets,
        title,
        notes
      });
      
      setSessions(prev => [...prev, newSession]);
      return newSession;
    } catch (err) {
      setError('Failed to save training session');
      throw err;
    }
  };

  // Get progress data for charts
  const getProgress = () => {
    try {
      return getTrainingProgress();
    } catch (err) {
      setError('Failed to calculate progress data');
      return [];
    }
  };

  // Get exercise name by ID
  const getExerciseName = (id: string) => {
    const exercise = exercises.find(ex => ex.id === id);
    return exercise ? exercise.name : 'Unknown';
  };

  return {
    exercises,
    sessions,
    loading,
    error,
    createSession,
    getProgress,
    getExerciseName
  };
}