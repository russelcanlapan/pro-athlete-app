export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  userType: 'athlete' | 'coach'
  profile?: UserProfile
  createdAt: Date
  updatedAt: Date
}

export interface UserProfile {
  id: string
  userId: string
  birthday?: Date
  height?: {
    feet: number
    inches: number
    unit: 'ft/in' | 'cm'
  }
  weight?: {
    value: number
    unit: 'lbs' | 'kg'
  }
  sport?: Sport
  teamType?: 'men' | 'women'
  position?: string
  avatar?: string
  bio?: string
}

export interface Sport {
  id: string
  name: string
  icon: string
  positions?: string[]
}

export interface Workout {
  id: string
  title: string
  description: string
  exercises: Exercise[]
  duration: number // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  createdBy: string // coach ID
  assignedTo?: string[] // athlete IDs
  createdAt: Date
  updatedAt: Date
}

export interface Exercise {
  id: string
  name: string
  description: string
  category: string
  muscleGroups: string[]
  equipment?: string[]
  instructions: string[]
  videoUrl?: string
  imageUrl?: string
}

export interface WorkoutSession {
  id: string
  workoutId: string
  athleteId: string
  coachId?: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  scheduledDate: Date
  completedDate?: Date
  notes?: string
  performance?: PerformanceMetrics
}

export interface PerformanceMetrics {
  duration: number // actual time taken
  exercises: {
    exerciseId: string
    sets: number
    reps: number
    weight?: number
    notes?: string
  }[]
  overallRating?: number // 1-10
  notes?: string
}

export interface Progress {
  id: string
  athleteId: string
  metric: string
  value: number
  unit: string
  date: Date
  notes?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface OnboardingState {
  currentStep: number
  totalSteps: number
  data: Partial<UserProfile>
  isComplete: boolean
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
