import User from '../models/User.js'
import { auth, db } from '../lib/firebase.ts'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc, getDoc, collection, serverTimestamp } from 'firebase/firestore'

class AuthService {
  constructor() {
    this.currentUser = null
    this.isAuthenticated = false
    this.setupAuthListener()
  }

  // Setup Firebase auth state listener
  setupAuthListener() {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const userDoc = await this.getUserFromFirestore(firebaseUser.uid)
        if (userDoc) {
          this.currentUser = new User({
            id: firebaseUser.uid,
            email: firebaseUser.email,
            ...userDoc
          })
          this.isAuthenticated = true
          this.saveToStorage()
        }
      } else {
        // User is signed out
        this.currentUser = null
        this.isAuthenticated = false
        this.clearStorage()
      }
    })
  }

  // Login user with Firebase Auth
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user
      
      // Get user data from Firestore
      const userDoc = await this.getUserFromFirestore(firebaseUser.uid)
      
      if (userDoc) {
        this.currentUser = new User({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          ...userDoc
        })
        this.isAuthenticated = true
        this.saveToStorage()
        return { success: true, user: this.currentUser }
      } else {
        return { success: false, error: 'User profile not found' }
      }
    } catch (error) {
      return { success: false, error: this.getFirebaseErrorMessage(error) }
    }
  }

  // Register user with Firebase Auth and store in Firestore
  async register(userData) {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
      const firebaseUser = userCredential.user
      
      // Create user profile in Firestore
      const userProfile = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        accountType: userData.accountType,
        email: userData.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isActive: true
      }
      
      await setDoc(doc(db, 'users', firebaseUser.uid), userProfile)
      
      this.currentUser = new User({
        id: firebaseUser.uid,
        email: firebaseUser.email,
        ...userProfile,
        isAuthenticated: true
      })
      this.isAuthenticated = true
      this.saveToStorage()
      
      return { success: true, user: this.currentUser }
    } catch (error) {
      return { success: false, error: this.getFirebaseErrorMessage(error) }
    }
  }

  // Logout user with Firebase
  async logout() {
    try {
      await signOut(auth)
      this.currentUser = null
      this.isAuthenticated = false
      this.clearStorage()
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Logout failed' }
    }
  }

  // Check if user is authenticated
  checkAuth() {
    const storedUser = this.getFromStorage()
    if (storedUser) {
      this.currentUser = new User(storedUser)
      this.isAuthenticated = true
      return true
    }
    return false
  }

  // Get user data from Firestore
  async getUserFromFirestore(uid) {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        return userDoc.data()
      }
      return null
    } catch (error) {
      console.error('Error fetching user from Firestore:', error)
      return null
    }
  }

  // Update user profile in Firestore
  async updateUserProfile(uid, updateData) {
    try {
      const userRef = doc(db, 'users', uid)
      await setDoc(userRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      }, { merge: true })
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Failed to update profile' }
    }
  }

  // Get Firebase error message
  getFirebaseErrorMessage(error) {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'No account found with this email address'
      case 'auth/wrong-password':
        return 'Incorrect password'
      case 'auth/email-already-in-use':
        return 'An account with this email already exists'
      case 'auth/weak-password':
        return 'Password should be at least 6 characters'
      case 'auth/invalid-email':
        return 'Please enter a valid email address'
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection'
      default:
        return error.message || 'An error occurred'
    }
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser
  }

  // Check if user is athlete
  isAthlete() {
    return this.currentUser && this.currentUser.isAthlete()
  }

  // Check if user is coach
  isCoach() {
    return this.currentUser && this.currentUser.isCoach()
  }

  // Save to localStorage
  saveToStorage() {
    if (this.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser.toJSON()))
      localStorage.setItem('isAuthenticated', 'true')
    }
  }

  // Get from localStorage
  getFromStorage() {
    const userData = localStorage.getItem('currentUser')
    return userData ? JSON.parse(userData) : null
  }

  // Clear localStorage
  clearStorage() {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('isAuthenticated')
  }
}

// Create singleton instance
const authService = new AuthService()

export default authService
