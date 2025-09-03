import React, { createContext, useContext, useReducer, useEffect } from 'react'
import authController from '../controllers/AuthController.js'
import authService from '../services/AuthService.js'

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
}

// Action types
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',
  SET_ERROR: 'SET_ERROR',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR'
}

// Reducer
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        error: null
      }
    case AUTH_ACTIONS.SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload
      }
    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null
      }
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}

// Create context
const AuthContext = createContext()

// Provider component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true })
        
        const authStatus = authController.checkAuthStatus()
        
        if (authStatus.isAuthenticated) {
          dispatch({ type: AUTH_ACTIONS.SET_USER, payload: authStatus.currentUser })
        }
      } catch (error) {
        dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: 'Failed to check authentication status' })
      } finally {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email, password) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true })
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR })

      const result = await authController.handleLogin(email, password)
      
      if (result.success) {
        dispatch({ type: AUTH_ACTIONS.SET_USER, payload: result.user })
        return { success: true, redirectTo: result.redirectTo }
      } else {
        dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: result.error })
        return { success: false, error: result.error }
      }
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: 'Login failed' })
      return { success: false, error: 'Login failed' }
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
    }
  }

  // Logout function
  const logout = () => {
    try {
      const result = authController.handleLogout()
      dispatch({ type: AUTH_ACTIONS.LOGOUT })
      return { success: true, redirectTo: result.redirectTo }
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: 'Logout failed' })
      return { success: false, error: 'Logout failed' }
    }
  }

  // Clear error
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR })
  }

  // Check if user is athlete
  const isAthlete = () => {
    return authController.canAccessAthleteRoutes()
  }

  // Check if user is coach
  const isCoach = () => {
    return authController.canAccessCoachRoutes()
  }

  // Get current user
  const getCurrentUser = () => {
    return authController.getCurrentUser()
  }

  // Check if authenticated
  const isAuthenticated = () => {
    return authController.isAuthenticated()
  }

  const value = {
    ...state,
    login,
    logout,
    clearError,
    isAthlete,
    isCoach,
    getCurrentUser,
    isAuthenticated
  }

  return React.createElement(AuthContext.Provider, { value }, children)
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
