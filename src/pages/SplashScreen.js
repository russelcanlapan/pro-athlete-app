import React from 'react'
import { useNavigate } from 'react-router-dom'

function SplashScreen() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/signup')
  }

  const handleSignIn = () => {
    navigate('/login')
  }

  const tryDemo = () => {
    alert('Demo coming soon! Please use "Start Free Trial" to access the full app.')
  }

  return React.createElement('div', { className: 'bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen' },
    // Header
    React.createElement('header', { className: 'bg-white shadow-sm' },
      React.createElement('div', { className: 'container mx-auto px-4 py-4' },
        React.createElement('div', { className: 'flex justify-between items-center' },
          React.createElement('div', { className: 'flex items-center space-x-3' },
            React.createElement('div', { className: 'w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center' },
              React.createElement('img', { 
                src: 'images/PA-logo_blanc.png', 
                alt: 'PRO ATHLETE', 
                className: 'w-10 h-10 rounded-full' 
              })
            ),
            React.createElement('span', { className: 'text-xl font-bold text-gray-900' }, 'Pro Athlete')
          ),
          React.createElement('div', { className: 'flex space-x-4' },
            React.createElement('button', { 
              onClick: handleSignIn,
              className: 'text-blue-600 font-medium hover:text-blue-700 transition-colors'
            }, 'Sign In'),
            React.createElement('button', { 
              onClick: handleGetStarted,
              className: 'bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors'
            }, 'Get Started')
          )
        )
      )
    ),

    // Hero Section
    React.createElement('main', { className: 'container mx-auto px-4 py-16' },
      React.createElement('div', { className: 'text-center fade-in' },
        React.createElement('h1', { className: 'text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight' },
          'Less injuries,',
          React.createElement('br'),
          React.createElement('span', { className: 'text-blue-600' }, 'better performance')
        ),
        
        React.createElement('p', { className: 'text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed' },
          'Sport-specific exercises and programs that optimize strength, power, and prevention. Designed for athletes and coaches who want to maximize performance while minimizing injury risk.'
        ),

        React.createElement('div', { className: 'flex flex-col sm:flex-row gap-4 justify-center mb-16' },
          React.createElement('button', { 
            onClick: handleGetStarted,
            className: 'bg-blue-600 text-white font-semibold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-200'
          }, 'Start Free Trial'),
          React.createElement('button', { 
            onClick: tryDemo,
            className: 'border-2 border-blue-600 text-blue-600 font-semibold py-4 px-8 rounded-lg text-lg hover:bg-blue-50 transition-colors duration-200'
          }, 'Try Demo')
        )
      ),

      // Features Section
      React.createElement('div', { className: 'grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20' },
        // For Athletes
        React.createElement('div', { className: 'bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow' },
          React.createElement('div', { className: 'w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6' },
            React.createElement('div', { className: 'text-3xl' }, '🏃‍♂️')
          ),
          React.createElement('h3', { className: 'text-xl font-semibold text-gray-900 mb-4' }, 'For Athletes'),
          React.createElement('ul', { className: 'text-gray-600 space-y-2' },
            React.createElement('li', null, '• Personalized training programs'),
            React.createElement('li', null, '• Sport-specific exercises'),
            React.createElement('li', null, '• Injury prevention routines'),
            React.createElement('li', null, '• Progress tracking')
          )
        ),

        // For Coaches
        React.createElement('div', { className: 'bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow' },
          React.createElement('div', { className: 'w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6' },
            React.createElement('div', { className: 'text-3xl' }, '👨‍💼')
          ),
          React.createElement('h3', { className: 'text-xl font-semibold text-gray-900 mb-4' }, 'For Coaches'),
          React.createElement('ul', { className: 'text-gray-600 space-y-2' },
            React.createElement('li', null, '• Team management tools'),
            React.createElement('li', null, '• Custom program creation'),
            React.createElement('li', null, '• Athlete progress monitoring'),
            React.createElement('li', null, '• Performance analytics')
          )
        ),

        // Programs
        React.createElement('div', { className: 'bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow' },
          React.createElement('div', { className: 'w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6' },
            React.createElement('div', { className: 'text-3xl' }, '💪')
          ),
          React.createElement('h3', { className: 'text-xl font-semibold text-gray-900 mb-4' }, 'Training Programs'),
          React.createElement('ul', { className: 'text-gray-600 space-y-2' },
            React.createElement('li', null, '• Strength training'),
            React.createElement('li', null, '• Mobility & flexibility'),
            React.createElement('li', null, '• Prehabilitation'),
            React.createElement('li', null, '• Warm-up routines')
          )
        )
      ),

      // Sports Section
      React.createElement('div', { className: 'mt-20 text-center' },
        React.createElement('h2', { className: 'text-3xl font-bold text-gray-900 mb-8' }, 'Supporting Multiple Sports'),
        React.createElement('div', { className: 'flex justify-center space-x-8' },
          React.createElement('div', { className: 'text-center' },
            React.createElement('div', { className: 'text-4xl mb-2' }, '🏀'),
            React.createElement('p', { className: 'text-gray-600' }, 'Basketball')
          ),
          React.createElement('div', { className: 'text-center' },
            React.createElement('div', { className: 'text-4xl mb-2' }, '🏐'),
            React.createElement('p', { className: 'text-gray-600' }, 'Volleyball')
          ),
          React.createElement('div', { className: 'text-center' },
            React.createElement('div', { className: 'text-4xl mb-2' }, '🏈'),
            React.createElement('p', { className: 'text-gray-600' }, 'Football')
          ),
          React.createElement('div', { className: 'text-center' },
            React.createElement('div', { className: 'text-4xl mb-2' }, '⚽'),
            React.createElement('p', { className: 'text-gray-600' }, 'Soccer')
          )
        )
      )
    ),

    // Footer
    React.createElement('footer', { className: 'bg-white border-t mt-20' },
      React.createElement('div', { className: 'container mx-auto px-4 py-8' },
        React.createElement('div', { className: 'text-center text-gray-600' },
          React.createElement('p', null, '© 2024 Pro Athlete. All rights reserved.')
        )
      )
    )
  )
}

export default SplashScreen
