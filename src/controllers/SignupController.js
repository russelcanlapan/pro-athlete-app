import signupService from '../services/SignupService.js'
import authService from '../services/AuthService.js'

class SignupController {
  constructor() {
    this.signupService = signupService
    this.authService = authService
  }

  // Start signup process
  startSignup() {
    const signupData = this.signupService.startSignup()
    return {
      success: true,
      signupData,
      currentStep: signupData.currentStep
    }
  }

  // Handle email step
  handleEmailStep(email) {
    try {
      const signupData = this.signupService.updateEmail(email)
      return {
        success: true,
        signupData,
        currentStep: signupData.currentStep,
        nextStep: signupData.currentStep + 1
      }
    } catch (error) {
      return {
        success: false,
        error: 'Failed to save email'
      }
    }
  }

  // Handle email verification step
  async handleEmailVerificationStep(pin) {
    try {
      const result = await this.signupService.verifyEmail(pin)
      
      if (result.success) {
        return {
          success: true,
          signupData: result.signupData,
          currentStep: result.signupData.currentStep,
          nextStep: result.signupData.currentStep + 1
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
        error: 'Email verification failed'
      }
    }
  }

  // Handle password step
  handlePasswordStep(password) {
    try {
      const signupData = this.signupService.updatePassword(password)
      return {
        success: true,
        signupData,
        currentStep: signupData.currentStep,
        nextStep: signupData.currentStep + 1
      }
    } catch (error) {
      return {
        success: false,
        error: 'Failed to save password'
      }
    }
  }

  // Handle name step
  handleNameStep(firstName, lastName) {
    try {
      const signupData = this.signupService.updateName(firstName, lastName)
      return {
        success: true,
        signupData,
        currentStep: signupData.currentStep,
        nextStep: signupData.currentStep + 1
      }
    } catch (error) {
      return {
        success: false,
        error: 'Failed to save name'
      }
    }
  }

  // Handle account type step
  handleAccountTypeStep(accountType) {
    try {
      const signupData = this.signupService.updateAccountType(accountType)
      return {
        success: true,
        signupData,
        currentStep: signupData.currentStep,
        nextStep: signupData.currentStep + 1
      }
    } catch (error) {
      return {
        success: false,
        error: 'Failed to save account type'
      }
    }
  }

  // Complete signup
  async completeSignup() {
    try {
      const result = await this.signupService.completeSignup()
      
      if (result.success) {
        // User is automatically authenticated through Firebase
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
        error: 'Signup completion failed'
      }
    }
  }

  // Get current signup data
  getCurrentSignupData() {
    return this.signupService.getSignupData()
  }

  // Get current step
  getCurrentStep() {
    return this.signupService.getCurrentStep()
  }

  // Check if step is complete
  isStepComplete(step) {
    return this.signupService.isStepComplete(step)
  }

  // Go to previous step
  goToPreviousStep() {
    const signupData = this.signupService.previousStep()
    return {
      success: true,
      signupData,
      currentStep: signupData.currentStep
    }
  }

  // Get redirect path based on account type
  getRedirectPath(user) {
    if (!user) return '/'
    
    if (user.accountType === 'athlete') {
      return '/athlete/dashboard'
    } else if (user.accountType === 'coach') {
      return '/coach/dashboard'
    }
    
    return '/'
  }

  // Validate step data
  validateStepData(step, data) {
    switch (step) {
      case 1: // Email
        return this.validateEmail(data.email)
      case 2: // Email verification
        return this.validatePin(data.pin)
      case 3: // Password
        return this.validatePassword(data.password)
      case 4: // Name
        return this.validateName(data.firstName, data.lastName)
      case 5: // Account type
        return this.validateAccountType(data.accountType)
      default:
        return { isValid: false, error: 'Invalid step' }
    }
  }

  // Validate email
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      return { isValid: false, error: 'Email is required' }
    }
    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Please enter a valid email' }
    }
    return { isValid: true }
  }

  // Validate PIN
  validatePin(pin) {
    if (!pin) {
      return { isValid: false, error: 'PIN is required' }
    }
    if (pin.length !== 6) {
      return { isValid: false, error: 'PIN must be 6 digits' }
    }
    if (!/^\d+$/.test(pin)) {
      return { isValid: false, error: 'PIN must contain only numbers' }
    }
    return { isValid: true }
  }

  // Validate password
  validatePassword(password) {
    if (!password) {
      return { isValid: false, error: 'Password is required' }
    }
    if (password.length < 8) {
      return { isValid: false, error: 'Password must be at least 8 characters' }
    }
    return { isValid: true }
  }

  // Validate name
  validateName(firstName, lastName) {
    if (!firstName || !lastName) {
      return { isValid: false, error: 'First name and last name are required' }
    }
    if (firstName.length < 2 || lastName.length < 2) {
      return { isValid: false, error: 'Names must be at least 2 characters' }
    }
    return { isValid: true }
  }

  // Validate account type
  validateAccountType(accountType) {
    if (!accountType) {
      return { isValid: false, error: 'Please select an account type' }
    }
    if (!['athlete', 'coach'].includes(accountType)) {
      return { isValid: false, error: 'Invalid account type' }
    }
    return { isValid: true }
  }
}

// Create singleton instance
const signupController = new SignupController()

export default signupController
