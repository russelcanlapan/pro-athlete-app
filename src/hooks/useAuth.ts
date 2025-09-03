import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import type { FirebaseUser } from '../types/firebase';

export const useAuth = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userProfile, setUserProfile] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    if (user) {
      setUserProfile({
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || undefined,
        photoURL: user.photoURL || undefined,
        emailVerified: user.emailVerified
      });
    } else {
      setUserProfile(null);
    }
  }, [user]);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }
      
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  const updateUserProfile = async (updates: { displayName?: string; photoURL?: string }) => {
    if (!user) return { success: false, error: new Error('No user logged in') };
    
    try {
      await updateProfile(user, updates);
      return { success: true };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  return {
    user: userProfile,
    loading,
    error,
    signIn,
    signUp,
    logout,
    resetPassword,
    updateUserProfile,
    isAuthenticated: !!user
  };
};
