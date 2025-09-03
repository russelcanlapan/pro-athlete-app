class User {
  constructor(data = {}) {
    // Basic user information
    this.id = data.id || null
    this.email = data.email || ''
    this.firstName = data.firstName || ''
    this.lastName = data.lastName || ''
    this.accountType = data.accountType || null // 'athlete' or 'coach'
    this.isAuthenticated = data.isAuthenticated || false
    this.isActive = data.isActive || true
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()
    
    // Profile information
    this.profilePicture = data.profilePicture || null
    this.phone = data.phone || ''
    this.dateOfBirth = data.dateOfBirth || null
    this.gender = data.gender || ''
    
    // Athletic information
    this.height = data.height || null // in cm
    this.weight = data.weight || null // in kg
    this.sport = data.sport || ''
    this.position = data.position || ''
    this.skillLevel = data.skillLevel || '' // beginner, intermediate, advanced
    
    // Team information
    this.teamId = data.teamId || null
    this.teamName = data.teamName || ''
    this.teamCode = data.teamCode || ''
    
    // Coach-specific information
    this.organization = data.organization || ''
    this.coachingExperience = data.coachingExperience || null // years
    this.certifications = data.certifications || []
    this.teamsManaged = data.teamsManaged || []
    
    // Settings and preferences
    this.notifications = data.notifications || {
      email: true,
      push: true,
      sms: false
    }
    this.timezone = data.timezone || 'UTC'
    this.language = data.language || 'en'
    
    // Subscription information
    this.subscriptionType = data.subscriptionType || 'free' // free, premium, team
    this.subscriptionStatus = data.subscriptionStatus || 'active'
    this.subscriptionExpiresAt = data.subscriptionExpiresAt || null
  }

  // Get full name
  getFullName() {
    return `${this.firstName} ${this.lastName}`.trim()
  }

  // Check if user is an athlete
  isAthlete() {
    return this.accountType === 'athlete'
  }

  // Check if user is a coach
  isCoach() {
    return this.accountType === 'coach'
  }

  // Get display name based on account type
  getDisplayName() {
    if (this.isCoach()) {
      return `Coach ${this.getFullName()}`
    }
    return this.getFullName()
  }

  // Get age from date of birth
  getAge() {
    if (!this.dateOfBirth) return null
    const today = new Date()
    const birthDate = new Date(this.dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  // Check if profile is complete
  isProfileComplete() {
    const requiredFields = ['email', 'firstName', 'lastName', 'accountType']
    
    if (this.isAthlete()) {
      requiredFields.push('sport', 'dateOfBirth')
    } else if (this.isCoach()) {
      requiredFields.push('organization')
    }
    
    return requiredFields.every(field => this[field] && this[field] !== '')
  }

  // Get profile completion percentage
  getProfileCompletionPercentage() {
    const allFields = this.isAthlete() ? 
      ['email', 'firstName', 'lastName', 'sport', 'position', 'height', 'weight', 'dateOfBirth', 'phone'] :
      ['email', 'firstName', 'lastName', 'organization', 'coachingExperience', 'phone']
    
    const completedFields = allFields.filter(field => this[field] && this[field] !== '')
    return Math.round((completedFields.length / allFields.length) * 100)
  }

  // Check if user has active subscription
  hasActiveSubscription() {
    return this.subscriptionStatus === 'active' && 
           (this.subscriptionType === 'premium' || this.subscriptionType === 'team')
  }

  // Get BMI for athletes
  getBMI() {
    if (!this.height || !this.weight) return null
    const heightInMeters = this.height / 100
    return (this.weight / (heightInMeters * heightInMeters)).toFixed(1)
  }

  // Validate user data
  validate() {
    const errors = []
    
    if (!this.email) errors.push('Email is required')
    if (!this.firstName) errors.push('First name is required')
    if (!this.lastName) errors.push('Last name is required')
    if (!this.accountType) errors.push('Account type is required')
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (this.email && !emailRegex.test(this.email)) {
      errors.push('Please enter a valid email address')
    }
    
    return errors
  }

  // Convert to plain object for database storage
  toJSON() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      accountType: this.accountType,
      isAuthenticated: this.isAuthenticated,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      profilePicture: this.profilePicture,
      phone: this.phone,
      dateOfBirth: this.dateOfBirth,
      gender: this.gender,
      height: this.height,
      weight: this.weight,
      sport: this.sport,
      position: this.position,
      skillLevel: this.skillLevel,
      teamId: this.teamId,
      teamName: this.teamName,
      teamCode: this.teamCode,
      organization: this.organization,
      coachingExperience: this.coachingExperience,
      certifications: this.certifications,
      teamsManaged: this.teamsManaged,
      notifications: this.notifications,
      timezone: this.timezone,
      language: this.language,
      subscriptionType: this.subscriptionType,
      subscriptionStatus: this.subscriptionStatus,
      subscriptionExpiresAt: this.subscriptionExpiresAt
    }
  }

  // Create from JSON
  static fromJSON(data) {
    return new User(data)
  }
}

export default User
