import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type {
  Injury,
  AthleteProfile,
  CoachProfile,
  Team,
  Program,
  ProgressEntry,
  WorkoutSession
} from '../types/firebase';

// Generic CRUD operations
export const createDocument = async <T>(
  collectionName: string,
  data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
};

export const getDocument = async <T>(
  collectionName: string,
  id: string
): Promise<T | null> => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as T;
  }
  return null;
};

export const updateDocument = async <T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
};

export const deleteDocument = async (
  collectionName: string,
  id: string
): Promise<void> => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};

// Injury Services
export const createInjury = async (injury: Omit<Injury, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  return createDocument<Injury>('injuries', injury);
};

export const getInjuriesByUser = async (userId: string): Promise<Injury[]> => {
  const q = query(
    collection(db, 'injuries'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Injury[];
};

export const updateInjury = async (id: string, injury: Partial<Injury>): Promise<void> => {
  return updateDocument<Injury>('injuries', id, injury);
};

export const deleteInjury = async (id: string): Promise<void> => {
  return deleteDocument('injuries', id);
};

// Profile Services
export const createAthleteProfile = async (profile: Omit<AthleteProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  return createDocument<AthleteProfile>('athleteProfiles', profile);
};

export const getAthleteProfile = async (userId: string): Promise<AthleteProfile | null> => {
  const q = query(
    collection(db, 'athleteProfiles'),
    where('userId', '==', userId),
    limit(1)
  );
  
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as AthleteProfile;
  }
  return null;
};

export const createCoachProfile = async (profile: Omit<CoachProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  return createDocument<CoachProfile>('coachProfiles', profile);
};

export const getCoachProfile = async (userId: string): Promise<CoachProfile | null> => {
  const q = query(
    collection(db, 'coachProfiles'),
    where('userId', '==', userId),
    limit(1)
  );
  
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as CoachProfile;
  }
  return null;
};

// Team Services
export const createTeam = async (team: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  return createDocument<Team>('teams', team);
};

export const getTeamsByCoach = async (coachId: string): Promise<Team[]> => {
  const q = query(
    collection(db, 'teams'),
    where('coachId', '==', coachId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Team[];
};

export const getTeamsByAthlete = async (athleteId: string): Promise<Team[]> => {
  const q = query(
    collection(db, 'teams'),
    where('athletes', 'array-contains', athleteId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Team[];
};

// Program Services
export const createProgram = async (program: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  return createDocument<Program>('programs', program);
};

export const getPrograms = async (): Promise<Program[]> => {
  const q = query(
    collection(db, 'programs'),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Program[];
};

export const getProgramsByType = async (type: Program['type']): Promise<Program[]> => {
  const q = query(
    collection(db, 'programs'),
    where('type', '==', type),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Program[];
};

// Progress Tracking Services
export const createProgressEntry = async (entry: Omit<ProgressEntry, 'id' | 'createdAt'>): Promise<string> => {
  return createDocument<ProgressEntry>('progressEntries', entry);
};

export const getProgressEntriesByUser = async (userId: string): Promise<ProgressEntry[]> => {
  const q = query(
    collection(db, 'progressEntries'),
    where('userId', '==', userId),
    orderBy('date', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as ProgressEntry[];
};

// Workout Session Services
export const createWorkoutSession = async (session: Omit<WorkoutSession, 'id' | 'createdAt'>): Promise<string> => {
  return createDocument<WorkoutSession>('workoutSessions', session);
};

export const getWorkoutSessionsByUser = async (userId: string): Promise<WorkoutSession[]> => {
  const q = query(
    collection(db, 'workoutSessions'),
    where('userId', '==', userId),
    orderBy('date', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as WorkoutSession[];
};

// Utility function to convert Firestore timestamps
export const convertTimestamp = (timestamp: Timestamp): Date => {
  return timestamp.toDate();
};
