// Firebase User Types
export interface FirebaseUser {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
}

// Injury Types
export interface Injury {
  id?: string;
  userId: string;
  location: string;
  type: string;
  description?: string;
  date: string;
  status: 'Current' | 'Past' | 'Recovered';
  severity: 'Mild' | 'Moderate' | 'Severe';
  recoveryPeriod?: string;
  allowedActivities?: string;
  restrictions?: string;
  otherInstructions?: string;
  rehabExercises?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Athlete Profile Types
export interface AthleteProfile {
  id?: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  height: number;
  weight: number;
  sport: string;
  team?: string;
  position?: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
  createdAt: Date;
  updatedAt: Date;
}

// Coach Profile Types
export interface CoachProfile {
  id?: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  sport: string;
  team?: string;
  experience: number;
  certifications?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Team Types
export interface Team {
  id?: string;
  name: string;
  sport: string;
  coachId: string;
  athletes: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Program Types
export interface Program {
  id?: string;
  name: string;
  type: 'Strength' | 'Mobility' | 'Prehab' | 'Rehab';
  description: string;
  exercises: Exercise[];
  duration: number; // in weeks
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  createdAt: Date;
  updatedAt: Date;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number; // in seconds
  restTime: number; // in seconds
  instructions: string;
  videoUrl?: string;
  imageUrl?: string;
}

// Progress Tracking Types
export interface ProgressEntry {
  id?: string;
  userId: string;
  date: Date;
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  notes?: string;
  createdAt: Date;
}

// Workout Session Types
export interface WorkoutSession {
  id?: string;
  userId: string;
  programId: string;
  date: Date;
  exercises: CompletedExercise[];
  duration: number; // in minutes
  notes?: string;
  createdAt: Date;
}

export interface CompletedExercise {
  exerciseId: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  completed: boolean;
  notes?: string;
}
