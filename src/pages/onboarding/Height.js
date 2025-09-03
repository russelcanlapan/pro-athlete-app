import React from 'react'

const OnboardingHeight = () => {
  return React.createElement('div', { className: 'min-h-screen bg-gray-50' },
    React.createElement('div', { className: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8' },
      React.createElement('h1', { className: 'text-3xl font-bold text-gray-900 mb-8' }, 'Onboarding Height'),
      React.createElement('div', { className: 'bg-white rounded-xl shadow-sm p-6' },
        React.createElement('p', { className: 'text-gray-600' }, 'Height page coming soon...')
      )
    )
  )
}

export default OnboardingHeight
