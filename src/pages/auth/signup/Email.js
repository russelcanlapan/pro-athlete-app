import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import signupController from '../../../controllers/SignupController.js'
import SignupView from '../../../views/SignupView.js'

class EmailController {
  constructor() {
    this.email = ''
    this.error = ''
    this.navigate = null
    this.signupView = null
  }

  setNavigate(navigateFunction) {
    this.navigate = navigateFunction
  }

  setSignupView(view) {
    this.signupView = view
  }

  setEmail(email) {
    this.email = email
    this.error = ''
  }

  setError(error) {
    this.error = error
  }

  async handleEmailChange(event) {
    this.setEmail(event.target.value)
  }

  async handleSubmit(event) {
    event.preventDefault()
    
    // Validate email
    const validation = signupController.validateStepData(1, { email: this.email })
    if (!validation.isValid) {
      this.setError(validation.error)
      return
    }

    // Handle email step
    const result = signupController.handleEmailStep(this.email)
    if (result.success) {
      if (this.navigate) {
        this.navigate('/signup/email-pin')
      }
    } else {
      this.setError(result.error)
    }
  }

  getEmail() {
    return this.email
  }

  getError() {
    return this.error
  }
}

class EmailView {
  constructor(controller) {
    this.controller = controller
  }

  render() {
    if (!this.controller.signupView) {
      return React.createElement('div', null, 'Loading...')
    }

    return this.controller.signupView.renderEmailStep(
      this.controller.getEmail(),
      (e) => this.controller.handleEmailChange(e),
      (e) => this.controller.handleSubmit(e)
    )
  }
}

function Email() {
  const navigate = useNavigate()
  const controller = new EmailController()
  const view = new EmailView(controller)
  
  controller.setNavigate(navigate)
  controller.setSignupView(new SignupView())

  useEffect(() => {
    // Initialize signup process
    const result = signupController.startSignup()
    if (!result.success) {
      controller.setError('Failed to start signup process')
    }
  }, [])

  return view.render()
}

export default Email
