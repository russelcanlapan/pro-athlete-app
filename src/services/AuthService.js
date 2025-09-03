import User from '../models/User.js'

class AuthService {
  constructor() {
    this.currentUser = null
    this.isAuthenticated = false
  }

  // Login user
  async login(email, password) {
    try {
      // Mock API call - replace with actual API
      const response = await this.mockApiCall({ email, password }, 'login')
      
      if (response.success) {
        this.currentUser = new User(response.user)
        this.isAuthenticated = true
        this.saveToStorage()
        return { success: true, user: this.currentUser }
      } else {
        return { success: false, error: response.error }
      }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    }
  }

  // Register user
  async register(userData) {
    try {
      // Mock API call - replace with actual API
      const response = await this.mockApiCall(userData, 'register')
      
      if (response.success) {
        this.currentUser = new User(response.user)
        this.isAuthenticated = true
        this.saveToStorage()
        return { success: true, user: this.currentUser }
      } else {
        return { success: false, error: response.error }
      }
    } catch (error) {
      return { success: false, error: 'Registration failed' }
    }
  }

  // Logout user
  logout() {
    this.currentUser = null
    this.isAuthenticated = false
    this.clearStorage()
    return { success: true }
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

  // Mock API call (replace with actual API)
  async mockApiCall(data, endpoint) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (endpoint === 'login') {
          // Mock login response
          resolve({
            success: true,
            user: {
              id: 1,
              email: data.email,
              firstName: 'John',
              lastName: 'Doe',
              accountType: 'athlete',
              isAuthenticated: true,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          })
        } else if (endpoint === 'register') {
          // Mock register response
          resolve({
            success: true,
            user: {
              id: 2,
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              accountType: data.accountType,
              isAuthenticated: true,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          })
        }
      }, 1000)
    })
  }
}

// Create singleton instance
const authService = new AuthService()

export default authService
