import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IconBack from '../../../components/icons/IconBack.js'

class EmailPinController {
  constructor() {
    this.pin = ['', '', '', '', '', '']
    this.isLoading = false
    this.email = ''
    this.navigate = null
    this.location = null
    this.inputRefs = []
  }

  setNavigate(navigateFunction) {
    this.navigate = navigateFunction
  }

  setLocation(locationObject) {
    this.location = locationObject
  }

  setInputRefs(refs) {
    this.inputRefs = refs
  }

  setEmail(email) {
    this.email = email
  }

  setPin(index, value) {
    if (value.length > 1) return // Only allow single digit
    
    this.pin[index] = value

    // Move to next input if value is entered
    if (value && index < 5 && this.inputRefs[index + 1]) {
      this.inputRefs[index + 1].focus()
    }
  }

  setLoading(loading) {
    this.isLoading = loading
  }

  handlePinChange(index, value) {
    this.setPin(index, value)
  }

  handleKeyDown(index, event) {
    if (event.key === 'Backspace' && !this.pin[index] && index > 0) {
      if (this.inputRefs[index - 1]) {
        this.inputRefs[index - 1].focus()
      }
    }
  }

  handleNext() {
    const pinString = this.pin.join('')
    if (pinString.length !== 6) return
    
    this.setLoading(true)
    setTimeout(() => {
      this.setLoading(false)
      if (this.navigate) {
        this.navigate('/signup/password', { state: { email: this.email } })
      }
    }, 1000)
  }

  handleBack() {
    if (this.navigate) {
      this.navigate('/signup/email')
    }
  }

  handleResend() {
    console.log('Resending email to:', this.email)
  }

  getPin() {
    return this.pin
  }

  getEmail() {
    return this.email
  }

  getIsLoading() {
    return this.isLoading
  }

  getProgressSteps() {
    return [
      { completed: true },
      { completed: true },
      { completed: false },
      { completed: false },
      { completed: false },
      { completed: false },
    ]
  }
}

class EmailPinView {
  constructor(controller) {
    this.controller = controller
  }

  renderHeader() {
    return React.createElement('header', { className: 'mb-8' },
      React.createElement('nav', { 
        className: 'flex items-center justify-between mb-4',
        role: 'navigation',
        'aria-label': 'Sign up progress'
      },
        React.createElement('button', {
          type: 'button',
          onClick: () => this.controller.handleBack(),
          className: 'p-2 hover:bg-gray-100 rounded-full transition-colors',
          'aria-label': 'Go back'
        }, React.createElement(IconBack, { className: 'w-6 h-6' })),
        
        React.createElement('div', {
          className: 'flex items-center gap-1.5 flex-1 mx-4',
          role: 'progressbar',
          'aria-valuenow': 2,
          'aria-valuemin': 1,
          'aria-valuemax': 6,
          'aria-label': 'Step 2 of 6'
        },
          this.controller.getProgressSteps().map((step, index) => 
            React.createElement('div', {
              key: index,
              className: 'flex-1 h-1 bg-gray-200 rounded overflow-hidden'
            },
              step.completed && React.createElement('div', {
                className: 'w-full h-1 bg-blue-600 rounded-lg'
              })
            )
          )
        ),
        
        React.createElement('div', { className: 'w-6 h-6' })
      ),

      React.createElement('h1', { 
        className: 'text-center text-sm font-medium text-gray-600'
      }, 'Can you verify your email?')
    )
  }

  renderMainContent() {
    return React.createElement('main', { className: 'mb-8' },
      React.createElement('div', { className: 'mb-6' },
        React.createElement('h2', { 
          className: 'text-2xl font-bold text-gray-900 mb-6'
        }, `Enter the 6 digit code that was sent to ${this.controller.getEmail()}`)
      ),

      React.createElement('div', { className: 'space-y-4' },
        React.createElement('div', { className: 'flex justify-center space-x-2 mb-6' },
          this.controller.getPin().map((digit, index) => 
            React.createElement('input', {
              key: index,
              ref: (el) => this.controller.inputRefs[index] = el,
              type: 'text',
              maxLength: 1,
              value: digit,
              onChange: (e) => this.controller.handlePinChange(index, e.target.value),
              onKeyDown: (e) => this.controller.handleKeyDown(index, e),
              className: 'w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
              autoFocus: index === 0
            })
          )
        ),

        React.createElement('button', {
          onClick: () => this.controller.handleResend(),
          className: 'text-blue-600 hover:text-blue-700 text-sm font-medium'
        }, 'Resend email')
      )
    )
  }

  renderFooter() {
    return React.createElement('footer', { className: 'mt-8' },
      React.createElement('button', {
        onClick: () => this.controller.handleNext(),
        disabled: this.controller.getPin().join('').length !== 6 || this.controller.getIsLoading(),
        className: 'w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        'aria-label': 'Continue to next step'
      }, this.controller.getIsLoading() ? 'Loading...' : 'Next')
    )
  }

  render() {
    return React.createElement('div', { className: 'min-h-screen bg-white flex items-center justify-center' },
      React.createElement('div', { className: 'w-full max-w-md mx-auto px-6 py-8' },
        this.renderHeader(),
        this.renderMainContent(),
        this.renderFooter()
      )
    )
  }
}

function EmailPin() {
  const navigate = useNavigate()
  const location = useLocation()
  const controller = new EmailPinController()
  const view = new EmailPinView(controller)
  
  controller.setNavigate(navigate)
  controller.setLocation(location)

  useEffect(() => {
    if (location.state?.email) {
      controller.setEmail(location.state.email)
    }
  }, [location])

  return view.render()
}

export default EmailPin
