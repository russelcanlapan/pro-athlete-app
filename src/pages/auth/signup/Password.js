import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IconBack from '../../../components/icons/IconBack.js'

function Password() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  React.useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email)
    }
  }, [location])

  const progressSteps = [
    { completed: true },
    { completed: true },
    { completed: true },
    { completed: false },
    { completed: false },
    { completed: false },
  ]

  const handleNext = () => {
    if (!password) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/signup/name', { state: { email, password } })
    }, 1000)
  }

  const handleBack = () => {
    navigate('/signup/email-pin', { state: { email } })
  }

  return React.createElement('div', { className: 'min-h-screen bg-white flex items-center justify-center' },
    React.createElement('div', { className: 'w-full max-w-md mx-auto px-6 py-8' },
      // Header
      React.createElement('header', { className: 'mb-8' },
        React.createElement('nav', { 
          className: 'flex items-center justify-between mb-4',
          role: 'navigation',
          'aria-label': 'Sign up progress'
        },
          React.createElement('button', {
            type: 'button',
            onClick: handleBack,
            className: 'p-2 hover:bg-gray-100 rounded-full transition-colors',
            'aria-label': 'Go back'
          }, React.createElement(IconBack, { className: 'w-6 h-6' })),
          
          React.createElement('div', {
            className: 'flex items-center gap-1.5 flex-1 mx-4',
            role: 'progressbar',
            'aria-valuenow': 3,
            'aria-valuemin': 1,
            'aria-valuemax': 6,
            'aria-label': 'Step 3 of 6'
          },
            progressSteps.map((step, index) => 
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
        }, 'Create a password')
      ),

      // Main Content
      React.createElement('main', { className: 'mb-8' },
        React.createElement('div', { className: 'mb-6' },
          React.createElement('h2', { 
            className: 'text-2xl font-bold text-gray-900 mb-6'
          }, 'Set a password for your account')
        ),

        React.createElement('div', { className: 'space-y-4' },
          React.createElement('label', {
            htmlFor: 'password-input',
            className: 'block text-sm font-medium text-gray-700 mb-2'
          }, 'Password'),

          React.createElement('div', { className: 'relative' },
            React.createElement('input', {
              id: 'password-input',
              type: showPassword ? 'text' : 'password',
              value: password,
              onChange: (e) => setPassword(e.target.value),
              placeholder: '••••••••',
              className: 'w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
              autoFocus: true
            }),
            React.createElement('button', {
              type: 'button',
              onClick: () => setShowPassword(!showPassword),
              className: 'absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
            }, showPassword ? '👁️' : '👁️‍🗨️')
          )
        )
      ),

      // Footer
      React.createElement('footer', { className: 'mt-8' },
        React.createElement('button', {
          onClick: handleNext,
          disabled: !password || isLoading,
          className: 'w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          'aria-label': 'Continue to next step'
        }, isLoading ? 'Loading...' : 'Next')
      )
    )
  )
}

export default Password
