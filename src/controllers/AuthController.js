import authService from '../services/AuthService.js'

class AuthController {
  constructor() {
    this.authService = authService
  }

  // Handle login
  async handleLogin(email, password) {
    try {
      const result = await this.authService.login(email, password)
      
      if (result.success) {
        return {
          success: true,
          user: result.user,
          redirectTo: this.getRedirectPath(result.user)
        }
      } else {
        return {
          success: false,
          error: result.error
        }
      }
    } catch (error) {
      return {
        success: false,
        error: 'Login failed. Please try again.'
      }
    }
  }

  // Handle logout
  handleLogout() {
    const result = this.authService.logout()
    return {
      success: true,
      redirectTo: '/'
    }
  }

  // Check authentication status
  checkAuthStatus() {
    const isAuthenticated = this.authService.checkAuth()
    const currentUser = this.authService.getCurrentUser()
    
    return {
      isAuthenticated,
      currentUser,
      redirectTo: isAuthenticated ? this.getRedirectPath(currentUser) : null
    }
  }

  // Get redirect path based on user type
  getRedirectPath(user) {
    if (!user) return '/'
    
    if (user.isAthlete()) {
      return '/athlete/dashboard'
    } else if (user.isCoach()) {
      return '/coach/dashboard'
    }
    
    return '/'
  }

  // Check if user can access athlete routes
  canAccessAthleteRoutes() {
    return this.authService.isAthlete()
  }

  // Check if user can access coach routes
  canAccessCoachRoutes() {
    return this.authService.isCoach()
  }

  // Get current user
  getCurrentUser() {
    return this.authService.getCurrentUser()
  }

  // Check if user is authenticated
  isAuthenticated() {
    return this.authService.isAuthenticated
  }
}

// Create singleton instance
const authController = new AuthController()

export default authController
