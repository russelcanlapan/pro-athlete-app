import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return React.createElement('div', { className: 'min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-50 to-primary-50' },
    React.createElement('div', { className: 'max-w-md w-full mx-4 text-center' },
      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'text-6xl font-bold text-primary-600 mb-4' }, '404'),
        React.createElement('h1', { className: 'text-2xl font-bold text-gray-900 mb-4' }, 'Page Not Found'),
        React.createElement('p', { className: 'text-gray-600 mb-8' },
          'The page you\'re looking for doesn\'t exist or has been moved.'
        ),
        
        React.createElement('div', { className: 'space-y-4' },
          React.createElement(Link, { to: '/', className: 'btn-primary w-full flex items-center justify-center' },
            React.createElement('span', { className: 'mr-2' }, '🏠'),
            'Go Home'
          ),
          React.createElement('button', {
            onClick: () => window.history.back(),
            className: 'btn-secondary w-full flex items-center justify-center'
          },
            React.createElement('span', { className: 'mr-2' }, '←'),
            'Go Back'
          )
        )
      )
    )
  )
}

export default NotFound
