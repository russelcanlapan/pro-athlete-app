import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    setIsLoading(false)
  }

  if (isSubmitted) {
    return React.createElement('div', { className: 'min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-50 to-primary-50' },
      React.createElement('div', { className: 'max-w-md w-full mx-4' },
        React.createElement('div', { className: 'card text-center' },
          React.createElement('div', { className: 'w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6' },
            React.createElement('div', { className: 'h-8 w-8 text-success-600' }, '📧')
          ),
          React.createElement('h1', { className: 'text-2xl font-bold text-gray-900 mb-4' }, 'Check Your Email'),
          React.createElement('p', { className: 'text-gray-600 mb-6' },
            'We\'ve sent a password reset link to ',
            React.createElement('strong', null, email)
          ),
          React.createElement(Link, { to: '/login', className: 'btn-primary w-full' }, 'Back to Login')
        )
      )
    )
  }

  return React.createElement('div', { className: 'min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-50 to-primary-50' },
    React.createElement('div', { className: 'max-w-md w-full mx-4' },
      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'text-center mb-8' },
          React.createElement('h1', { className: 'text-3xl font-bold text-gray-900 mb-2' }, 'Forgot Password'),
          React.createElement('p', { className: 'text-gray-600' }, 'Enter your email to reset your password')
        ),

        React.createElement('form', { onSubmit: handleSubmit, className: 'space-y-6' },
          React.createElement('div', null,
            React.createElement('label', { htmlFor: 'email', className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Email Address'),
            React.createElement('div', { className: 'relative' },
              React.createElement('input', {
                id: 'email',
                type: 'email',
                value: email,
                onChange: (e) => setEmail(e.target.value),
                className: 'input-field pl-10',
                placeholder: 'Enter your email',
                required: true
              })
            )
          ),

          React.createElement('button', {
            type: 'submit',
            disabled: isLoading,
            className: 'btn-primary w-full flex items-center justify-center'
          }, isLoading ? 
            React.createElement('div', { className: 'animate-spin rounded-full h-5 w-5 border-b-2 border-white' }) : 
            'Send Reset Link'
          )
        ),

        React.createElement('div', { className: 'mt-6 text-center' },
          React.createElement(Link, {
            to: '/login',
            className: 'text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center'
          },
            React.createElement('span', { className: 'mr-1' }, '←'),
            'Back to Login'
          )
        )
      )
    )
  )
}

export default ForgotPassword
