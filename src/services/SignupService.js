import SignupData from '../models/SignupData.js'

class SignupService {
  constructor() {
    this.signupData = new SignupData()
    this.loadFromStorage()
  }

  // Start signup process
  startSignup() {
    this.signupData.reset()
    this.saveToStorage()
    return this.signupData
  }

  // Update email
  updateEmail(email) {
    this.signupData.email = email
    this.saveToStorage()
    return this.signupData
  }

  // Verify email with PIN
  async verifyEmail(pin) {
    try {
      // Mock email verification - replace with actual API
      const response = await this.mockEmailVerification(pin)
      
      if (response.success) {
        this.signupData.emailVerified = true
        this.signupData.nextStep()
        this.saveToStorage()
        return { success: true, signupData: this.signupData }
      } else {
        return { success: false, error: response.error }
      }
    } catch (error) {
      return { success: false, error: 'Email verification failed' }
    }
  }

  // Update password
  updatePassword(password) {
    this.signupData.password = password
    this.signupData.nextStep()
    this.saveToStorage()
    return this.signupData
  }

  // Update name
  updateName(firstName, lastName) {
    this.signupData.firstName = firstName
    this.signupData.lastName = lastName
    this.signupData.nextStep()
    this.saveToStorage()
    return this.signupData
  }

  // Update account type
  updateAccountType(accountType) {
    this.signupData.accountType = accountType
    this.signupData.nextStep()
    this.saveToStorage()
    return this.signupData
  }

  // Complete signup using Firebase
  async completeSignup() {
    try {
      // Import auth service to handle Firebase registration
      const authService = (await import('./AuthService.js')).default
      
      const userData = {
        email: this.signupData.email,
        password: this.signupData.password,
        firstName: this.signupData.firstName,
        lastName: this.signupData.lastName,
        accountType: this.signupData.accountType
      }

      const response = await authService.register(userData)
      
      if (response.success) {
        this.clearStorage()
        return { success: true, user: response.user }
      } else {
        return { success: false, error: response.error }
      }
    } catch (error) {
      return { success: false, error: 'Signup completion failed' }
    }
  }

  // Get current signup data
  getSignupData() {
    return this.signupData
  }

  // Get current step
  getCurrentStep() {
    return this.signupData.currentStep
  }

  // Check if step is complete
  isStepComplete(step) {
    return this.signupData.isStepComplete(step)
  }

  // Check if signup is complete
  isComplete() {
    return this.signupData.isComplete()
  }

  // Go to previous step
  previousStep() {
    this.signupData.previousStep()
    this.saveToStorage()
    return this.signupData
  }

  // Save to localStorage
  saveToStorage() {
    localStorage.setItem('signupData', JSON.stringify(this.signupData.toJSON()))
  }

  // Load from localStorage
  loadFromStorage() {
    const data = localStorage.getItem('signupData')
    if (data) {
      this.signupData = SignupData.fromJSON(JSON.parse(data))
    }
  }

  // Clear storage
  clearStorage() {
    localStorage.removeItem('signupData')
  }

  // Email verification (simplified for demo)
  async mockEmailVerification(pin) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Accept any 6-digit PIN for demo purposes
        // In production, this would integrate with an actual email verification service
        if (pin.length === 6 && /^\d+$/.test(pin)) {
          resolve({ success: true })
        } else {
          resolve({ success: false, error: 'Invalid PIN' })
        }
      }, 1000)
    })
  }
}

// Create singleton instance
const signupService = new SignupService()

export default signupService
