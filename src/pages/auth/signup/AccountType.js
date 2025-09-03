import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IconBack from '../../../components/icons/IconBack.js'

function AccountType() {
  const [selectedType, setSelectedType] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  React.useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email)
    }
    if (location.state?.password) {
      setPassword(location.state.password)
    }
    if (location.state?.firstName) {
      setFirstName(location.state.firstName)
    }
    if (location.state?.lastName) {
      setLastName(location.state.lastName)
    }
  }, [location])

  const progressSteps = [
    { completed: true },
    { completed: true },
    { completed: true },
    { completed: true },
    { completed: true },
    { completed: false },
  ]

  const handleNext = () => {
    if (!selectedType) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // Navigate to appropriate dashboard based on account type
      if (selectedType === 'athlete') {
        navigate('/athlete/dashboard')
      } else {
        navigate('/coach/dashboard')
      }
    }, 1000)
  }

  const handleBack = () => {
    navigate('/signup/name', { state: { email, password } })
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
            'aria-valuenow': 5,
            'aria-valuemin': 1,
            'aria-valuemax': 6,
            'aria-label': 'Step 5 of 6'
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
        }, 'What best describes you?')
      ),

      // Main Content
      React.createElement('main', { className: 'mb-8' },
        React.createElement('div', { className: 'mb-6' },
          React.createElement('h2', { 
            className: 'text-2xl font-bold text-gray-900 mb-6'
          }, 'Are you a coach or an athlete?')
        ),

        React.createElement('div', { className: 'space-y-4' },
          // Athlete Option
          React.createElement('button', {
            onClick: () => setSelectedType('athlete'),
            className: `w-full p-6 border-2 rounded-lg transition-colors ${
              selectedType === 'athlete'
                ? 'border-blue-600 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`
          },
            React.createElement('div', { className: 'flex items-center space-x-4' },
              React.createElement('div', { className: 'text-2xl' }, '🏃'),
              React.createElement('span', { className: 'text-lg font-medium' }, "I'm an athlete")
            )
          ),

          // Coach Option
          React.createElement('button', {
            onClick: () => setSelectedType('coach'),
            className: `w-full p-6 border-2 rounded-lg transition-colors ${
              selectedType === 'coach'
                ? 'border-blue-600 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`
          },
            React.createElement('div', { className: 'flex items-center space-x-4' },
              React.createElement('div', { className: 'text-2xl' }, '📢'),
              React.createElement('span', { className: 'text-lg font-medium' }, "I'm a coach")
            )
          )
        )
      ),

      // Footer
      React.createElement('footer', { className: 'mt-8' },
        React.createElement('button', {
          onClick: handleNext,
          disabled: !selectedType || isLoading,
          className: 'w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          'aria-label': 'Complete signup'
        }, isLoading ? 'Loading...' : 'Next')
      )
    )
  )
}

export default AccountType
