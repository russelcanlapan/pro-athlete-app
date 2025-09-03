// Local storage utilities
export const storage = {
  // Set item
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('Error saving to localStorage:', error)
      return false
    }
  },

  // Get item
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return defaultValue
    }
  },

  // Remove item
  remove: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('Error removing from localStorage:', error)
      return false
    }
  },

  // Clear all
  clear: () => {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  },

  // Check if key exists
  has: (key) => {
    return localStorage.getItem(key) !== null
  }
}

// Session storage utilities
export const sessionStorage = {
  // Set item
  set: (key, value) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('Error saving to sessionStorage:', error)
      return false
    }
  },

  // Get item
  get: (key, defaultValue = null) => {
    try {
      const item = sessionStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error('Error reading from sessionStorage:', error)
      return defaultValue
    }
  },

  // Remove item
  remove: (key) => {
    try {
      sessionStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('Error removing from sessionStorage:', error)
      return false
    }
  },

  // Clear all
  clear: () => {
    try {
      sessionStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing sessionStorage:', error)
      return false
    }
  },

  // Check if key exists
  has: (key) => {
    return sessionStorage.getItem(key) !== null
  }
}

// User storage keys
export const USER_STORAGE_KEYS = {
  CURRENT_USER: 'currentUser',
  IS_AUTHENTICATED: 'isAuthenticated',
  SIGNUP_DATA: 'signupData',
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken'
}

// User storage utilities
export const userStorage = {
  // Save current user
  saveUser: (user) => {
    return storage.set(USER_STORAGE_KEYS.CURRENT_USER, user)
  },

  // Get current user
  getUser: () => {
    return storage.get(USER_STORAGE_KEYS.CURRENT_USER)
  },

  // Remove current user
  removeUser: () => {
    storage.remove(USER_STORAGE_KEYS.CURRENT_USER)
    storage.remove(USER_STORAGE_KEYS.IS_AUTHENTICATED)
    storage.remove(USER_STORAGE_KEYS.AUTH_TOKEN)
    storage.remove(USER_STORAGE_KEYS.REFRESH_TOKEN)
  },

  // Set authentication status
  setAuthenticated: (status) => {
    return storage.set(USER_STORAGE_KEYS.IS_AUTHENTICATED, status)
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return storage.get(USER_STORAGE_KEYS.IS_AUTHENTICATED, false)
  },

  // Save auth token
  saveToken: (token) => {
    return storage.set(USER_STORAGE_KEYS.AUTH_TOKEN, token)
  },

  // Get auth token
  getToken: () => {
    return storage.get(USER_STORAGE_KEYS.AUTH_TOKEN)
  },

  // Save refresh token
  saveRefreshToken: (token) => {
    return storage.set(USER_STORAGE_KEYS.REFRESH_TOKEN, token)
  },

  // Get refresh token
  getRefreshToken: () => {
    return storage.get(USER_STORAGE_KEYS.REFRESH_TOKEN)
  }
}

// Signup storage utilities
export const signupStorage = {
  // Save signup data
  saveSignupData: (data) => {
    return storage.set(USER_STORAGE_KEYS.SIGNUP_DATA, data)
  },

  // Get signup data
  getSignupData: () => {
    return storage.get(USER_STORAGE_KEYS.SIGNUP_DATA)
  },

  // Remove signup data
  removeSignupData: () => {
    return storage.remove(USER_STORAGE_KEYS.SIGNUP_DATA)
  },

  // Check if signup data exists
  hasSignupData: () => {
    return storage.has(USER_STORAGE_KEYS.SIGNUP_DATA)
  }
}
