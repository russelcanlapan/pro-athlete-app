import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

class WelcomeController {
  constructor() {
    this.isLoginClicked = false
    this.navigate = null
  }

  setNavigate(navigateFunction) {
    this.navigate = navigateFunction
  }

  handleCreateAccount() {
    // Navigate to the HTML signup email page in the public folder
    window.location.href = '/auth/signup/email.html'
  }

  handleLoginClick() {
    this.isLoginClicked = true
    setTimeout(() => {
      this.isLoginClicked = false
      if (this.navigate) {
        this.navigate('/login')
      }
    }, 200)
  }

  getLoginButtonClassName() {
    return `w-full text-blue-600 font-medium py-4 px-6 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
      this.isLoginClicked ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
    }`
  }
}

class WelcomeView {
  constructor(controller) {
    this.controller = controller
  }

  renderLogo() {
    return React.createElement('div', { className: 'text-center mb-8' },
      React.createElement('div', { className: 'inline-block bg-blue-600 rounded-lg p-2 mb-4' },
        React.createElement('img', {
          src: '/images/PA-logo_blanc.png?v=2',
          alt: 'ProAthlete Logo',
          className: 'w-16 h-16'
        })
      )
    )
  }

  renderMainContent() {
    return React.createElement('main', { className: 'mb-8' },
      React.createElement('div', { className: 'text-center mb-8' },
        React.createElement('h1', { 
          className: 'text-3xl font-bold text-gray-900 mb-4'
        }, 'Less injuries, better performance'),
        React.createElement('p', { 
          className: 'text-lg text-gray-600'
        }, 'Sport-specific exercises and programs that optimize strength, power, and prevention')
      )
    )
  }

  renderButtons() {
    return React.createElement('div', { className: 'space-y-6' },
      React.createElement('button', {
        onClick: () => this.controller.handleCreateAccount(),
        className: 'w-full bg-blue-600 text-white font-medium py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        'aria-label': 'Create an account'
      }, 'Create an account'),

      React.createElement('button', {
        onClick: () => this.controller.handleLoginClick(),
        className: this.controller.getLoginButtonClassName(),
        'aria-label': 'Sign in to existing account'
      }, 'I already have an account')
    )
  }

  render() {
    return React.createElement('div', { className: 'min-h-screen bg-white flex items-center justify-center' },
      React.createElement('div', { className: 'w-full max-w-md mx-auto px-6 py-8' },
        this.renderLogo(),
        this.renderMainContent(),
        this.renderButtons()
      )
    )
  }
}

function Welcome() {
  const navigate = useNavigate()
  const controller = new WelcomeController()
  const view = new WelcomeView(controller)
  
  controller.setNavigate(navigate)
  
  return view.render()
}

export default Welcome
