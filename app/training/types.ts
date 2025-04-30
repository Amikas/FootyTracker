// types/index.ts

export interface Exercise {
  id: string;
  name: string;
  category: string;
  description?: string;
}

export interface TrainingSet {
  id?: string;
  exerciseId: string;
  repetitions: number;
  weight?: number;     // Optional: for strength training
  duration?: number;   // Optional: for timed exercises (in seconds)
  distance?: number;   // Optional: for distance-based exercises (in meters)
}

export interface TrainingSession {
  id: string;
  userId: string;      // To associate with specific user
  date: string;        // ISO date string
  title?: string;      // Optional session title
  notes?: string;      // Optional session notes
  sets: TrainingSet[];
  createdAt?: string;  // Timestamp when session was created
  updatedAt?: string;  // Timestamp when session was last updated
}

// For user profiles
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  position?: string;   // Football position
  team?: string;       // Team name
  goals?: number;      // Season goals
  avatarUrl?: string;  // Profile picture
}

// For API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}