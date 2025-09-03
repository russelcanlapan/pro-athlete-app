// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) {
    return { isValid: false, error: 'Email is required' }
  }
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email' }
  }
  return { isValid: true }
}

// Password validation
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, error: 'Password is required' }
  }
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters' }
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' }
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' }
  }
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' }
  }
  return { isValid: true }
}

// Name validation
export const validateName = (firstName, lastName) => {
  if (!firstName || !lastName) {
    return { isValid: false, error: 'First name and last name are required' }
  }
  if (firstName.length < 2 || lastName.length < 2) {
    return { isValid: false, error: 'Names must be at least 2 characters' }
  }
  if (!/^[a-zA-Z\s]+$/.test(firstName) || !/^[a-zA-Z\s]+$/.test(lastName)) {
    return { isValid: false, error: 'Names can only contain letters and spaces' }
  }
  return { isValid: true }
}

// PIN validation
export const validatePin = (pin) => {
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

// Account type validation
export const validateAccountType = (accountType) => {
  if (!accountType) {
    return { isValid: false, error: 'Please select an account type' }
  }
  if (!['athlete', 'coach'].includes(accountType)) {
    return { isValid: false, error: 'Invalid account type' }
  }
  return { isValid: true }
}

// Form validation
export const validateForm = (formData, fields) => {
  const errors = {}
  
  fields.forEach(field => {
    switch (field) {
      case 'email':
        const emailValidation = validateEmail(formData.email)
        if (!emailValidation.isValid) {
          errors.email = emailValidation.error
        }
        break
      case 'password':
        const passwordValidation = validatePassword(formData.password)
        if (!passwordValidation.isValid) {
          errors.password = passwordValidation.error
        }
        break
      case 'firstName':
      case 'lastName':
        const nameValidation = validateName(formData.firstName, formData.lastName)
        if (!nameValidation.isValid) {
          errors.name = nameValidation.error
        }
        break
      case 'pin':
        const pinValidation = validatePin(formData.pin)
        if (!pinValidation.isValid) {
          errors.pin = pinValidation.error
        }
        break
      case 'accountType':
        const accountTypeValidation = validateAccountType(formData.accountType)
        if (!accountTypeValidation.isValid) {
          errors.accountType = accountTypeValidation.error
        }
        break
    }
  })
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}
