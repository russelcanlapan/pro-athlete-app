import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext.js'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading, error } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/athlete/dashboard'

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (error) {
      // Error is handled by the auth context
    }
  }

  return React.createElement('div', { className: 'min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-50 to-primary-50 py-12 px-4' },
    React.createElement('div', { className: 'max-w-md w-full' },
      React.createElement('div', { className: 'bg-white rounded-xl shadow-xl p-8' },
        React.createElement('div', { className: 'text-center mb-8' },
          React.createElement('h1', { className: 'text-3xl font-bold text-gray-900 mb-2' }, 'Welcome Back'),
          React.createElement('p', { className: 'text-gray-600' }, 'Sign in to your Pro Athlete account')
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
                className: 'w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200',
                placeholder: 'Enter your email',
                required: true
              })
            )
          ),

          React.createElement('div', null,
            React.createElement('label', { htmlFor: 'password', className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Password'),
            React.createElement('div', { className: 'relative' },
              React.createElement('input', {
                id: 'password',
                type: showPassword ? 'text' : 'password',
                value: password,
                onChange: (e) => setPassword(e.target.value),
                className: 'w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200',
                placeholder: 'Enter your password',
                required: true
              }),
              React.createElement('button', {
                type: 'button',
                onClick: () => setShowPassword(!showPassword),
                className: 'absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
              }, showPassword ? '👁️' : '👁️‍🗨️')
            )
          ),

          error && React.createElement('div', { className: 'bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg' }, error),

          React.createElement('button', {
            type: 'submit',
            disabled: isLoading,
            className: 'w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
          }, isLoading ? 
            React.createElement('div', { className: 'animate-spin rounded-full h-5 w-5 border-b-2 border-white' }) : 
            'Sign In'
          )
        ),

        React.createElement('div', { className: 'mt-6 text-center' },
          React.createElement(Link, {
            to: '/forgot-password',
            className: 'text-primary-600 hover:text-primary-700 text-sm font-medium'
          }, 'Forgot your password?')
        ),

        React.createElement('div', { className: 'mt-8 text-center' },
          React.createElement('p', { className: 'text-gray-600' },
            'Don\'t have an account? ',
            React.createElement(Link, { to: '/signup', className: 'text-primary-600 hover:text-primary-700 font-medium' }, 'Sign up')
          )
        )
      )
    )
  )
}

export default Login
