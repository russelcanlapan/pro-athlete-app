class User {
  constructor(data = {}) {
    this.id = data.id || null
    this.email = data.email || ''
    this.firstName = data.firstName || ''
    this.lastName = data.lastName || ''
    this.accountType = data.accountType || null // 'athlete' or 'coach'
    this.isAuthenticated = data.isAuthenticated || false
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()
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

  // Validate user data
  validate() {
    const errors = []
    
    if (!this.email) errors.push('Email is required')
    if (!this.firstName) errors.push('First name is required')
    if (!this.lastName) errors.push('Last name is required')
    if (!this.accountType) errors.push('Account type is required')
    
    return errors
  }

  // Convert to plain object
  toJSON() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      accountType: this.accountType,
      isAuthenticated: this.isAuthenticated,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }

  // Create from JSON
  static fromJSON(data) {
    return new User(data)
  }
}

export default User
