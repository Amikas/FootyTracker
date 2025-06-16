import { Exercise, TrainingSession, TrainingProgressEntry, Routine } from "./types";

// Fetch all exercises from backend
export const getExercises = async (): Promise<Exercise[]> => {
  try {
    const res = await fetch("/api/training?type=exercises");
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    if (!res.ok) throw new Error("Failed to fetch exercises");
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("getExercises error:", err);
    if (err instanceof Error && err.message === "Unauthorized") {
      throw err;
    }
    return [];
  }
};

// Fetch training sessions
export const getTrainingSessions = async (): Promise<TrainingSession[]> => {
  try {
    const res = await fetch("/api/training");
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    if (!res.ok) throw new Error("Failed to fetch sessions");
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("getTrainingSessions error:", err);
    if (err instanceof Error && err.message === "Unauthorized") {
      throw err;
    }
    return [];
  }
};

// Save new session
export const saveTrainingSession = async (
  session: Omit<TrainingSession, "id" | "createdAt" | "updatedAt">
): Promise<TrainingSession> => {
  try {
    const res = await fetch("/api/training", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(session),
    });

    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    if (!res.ok) throw new Error("Failed to save session");
    
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error("saveTrainingSession error:", err);
    throw err;
  }
};

// Generate progress from local session data (to be improved)
export const getTrainingProgress = async (): Promise<TrainingProgressEntry[]> => {
  try {
    const sessions = await getTrainingSessions();
    const progressMap: Record<string, TrainingProgressEntry> = {};

    sessions
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .forEach((session) => {
        const dateKey = new Date(session.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        session.sets.forEach((set) => {
          if (!progressMap[set.exerciseId]) {
            progressMap[set.exerciseId] = {
              exercise: set.exerciseId,
            };
          }
          progressMap[set.exerciseId][dateKey] = set.repetitions;
        });
      });

    return Object.values(progressMap);
  } catch (err) {
    console.error("getTrainingProgress error:", err);
    return [];
  }
};

// Create a new exercise
export const createExercise = async (exercise: Omit<Exercise, "id">): Promise<Exercise> => {
  try {
    const res = await fetch("/api/training/exercises", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exercise),
    });

    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    if (!res.ok) throw new Error("Failed to create exercise");
    
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error("createExercise error:", err);
    throw err;
  }
};

// Get all routines
export const getRoutines = async (): Promise<Routine[]> => {
  try {
    const res = await fetch("/api/training/routines");
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    if (!res.ok) throw new Error("Failed to fetch routines");
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("getRoutines error:", err);
    if (err instanceof Error && err.message === "Unauthorized") {
      throw err;
    }
    return [];
  }
};

// Create a new routine
export const createRoutine = async (routine: Omit<Routine, "id" | "createdAt" | "updatedAt">): Promise<Routine> => {
  try {
    const res = await fetch("/api/training/routines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(routine),
    });

    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    if (!res.ok) throw new Error("Failed to create routine");
    
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error("createRoutine error:", err);
    throw err;
  }
};
