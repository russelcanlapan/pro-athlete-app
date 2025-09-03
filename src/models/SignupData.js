class SignupData {
  constructor() {
    this.email = ''
    this.password = ''
    this.firstName = ''
    this.lastName = ''
    this.accountType = null
    this.emailVerified = false
    this.currentStep = 1
    this.totalSteps = 6
  }

  // Update data
  update(data) {
    Object.assign(this, data)
    return this
  }

  // Get current step data
  getCurrentStepData() {
    switch (this.currentStep) {
      case 1:
        return { email: this.email }
      case 2:
        return { email: this.email, emailVerified: this.emailVerified }
      case 3:
        return { email: this.email, password: this.password }
      case 4:
        return { 
          email: this.email, 
          password: this.password, 
          firstName: this.firstName, 
          lastName: this.lastName 
        }
      case 5:
        return { 
          email: this.email, 
          password: this.password, 
          firstName: this.firstName, 
          lastName: this.lastName,
          accountType: this.accountType
        }
      default:
        return this.toJSON()
    }
  }

  // Move to next step
  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++
    }
    return this.currentStep
  }

  // Move to previous step
  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--
    }
    return this.currentStep
  }

  // Check if current step is complete
  isStepComplete(step) {
    switch (step) {
      case 1:
        return !!this.email
      case 2:
        return this.emailVerified
      case 3:
        return !!this.password
      case 4:
        return !!(this.firstName && this.lastName)
      case 5:
        return !!this.accountType
      default:
        return false
    }
  }

  // Check if all steps are complete
  isComplete() {
    return this.email && 
           this.emailVerified && 
           this.password && 
           this.firstName && 
           this.lastName && 
           this.accountType
  }

  // Reset data
  reset() {
    this.email = ''
    this.password = ''
    this.firstName = ''
    this.lastName = ''
    this.accountType = null
    this.emailVerified = false
    this.currentStep = 1
  }

  // Convert to JSON
  toJSON() {
    return {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      accountType: this.accountType,
      emailVerified: this.emailVerified,
      currentStep: this.currentStep,
      totalSteps: this.totalSteps
    }
  }

  // Create from JSON
  static fromJSON(data) {
    const signupData = new SignupData()
    Object.assign(signupData, data)
    return signupData
  }
}

export default SignupData
