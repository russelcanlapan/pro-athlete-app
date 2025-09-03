import React from 'react'

const AthleteDashboard = () => {
  return React.createElement('div', { className: 'min-h-screen bg-gray-50' },
    React.createElement('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8' },
      React.createElement('div', { className: 'mb-8' },
        React.createElement('h1', { className: 'text-3xl font-bold text-gray-900' }, 'Athlete Dashboard'),
        React.createElement('p', { className: 'text-gray-600 mt-2' }, 'Welcome back! Here\'s your fitness overview.')
      ),

      React.createElement('div', { className: 'grid grid-cols-1 lg:grid-cols-3 gap-8' },
        // Stats Cards
        React.createElement('div', { className: 'bg-white rounded-xl shadow-sm p-6' },
          React.createElement('h3', { className: 'text-lg font-semibold text-gray-900 mb-4' }, 'Today\'s Workout'),
          React.createElement('div', { className: 'text-3xl font-bold text-primary-600 mb-2' }, 'Upper Body'),
          React.createElement('p', { className: 'text-gray-600' }, '45 minutes • 8 exercises')
        ),

        React.createElement('div', { className: 'bg-white rounded-xl shadow-sm p-6' },
          React.createElement('h3', { className: 'text-lg font-semibold text-gray-900 mb-4' }, 'Weekly Progress'),
          React.createElement('div', { className: 'text-3xl font-bold text-success-600 mb-2' }, '4/5'),
          React.createElement('p', { className: 'text-gray-600' }, 'Workouts completed')
        ),

        React.createElement('div', { className: 'bg-white rounded-xl shadow-sm p-6' },
          React.createElement('h3', { className: 'text-lg font-semibold text-gray-900 mb-4' }, 'Next Session'),
          React.createElement('div', { className: 'text-3xl font-bold text-warning-600 mb-2' }, 'Tomorrow'),
          React.createElement('p', { className: 'text-gray-600' }, 'Lower Body • 9:00 AM')
        )
      ),

      React.createElement('div', { className: 'grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8' },
        // Recent Activity
        React.createElement('div', { className: 'bg-white rounded-xl shadow-sm p-6' },
          React.createElement('h3', { className: 'text-lg font-semibold text-gray-900 mb-4' }, 'Recent Activity'),
          React.createElement('div', { className: 'space-y-4' },
            React.createElement('div', { className: 'flex items-center justify-between p-4 bg-gray-50 rounded-lg' },
              React.createElement('div', null,
                React.createElement('div', { className: 'font-medium text-gray-900' }, 'Upper Body Workout'),
                React.createElement('div', { className: 'text-sm text-gray-600' }, 'Yesterday • 42 minutes')
              ),
              React.createElement('div', { className: 'text-success-600 font-semibold' }, 'Completed')
            ),
            React.createElement('div', { className: 'flex items-center justify-between p-4 bg-gray-50 rounded-lg' },
              React.createElement('div', null,
                React.createElement('div', { className: 'font-medium text-gray-900' }, 'Cardio Session'),
                React.createElement('div', { className: 'text-sm text-gray-600' }, '2 days ago • 30 minutes')
              ),
              React.createElement('div', { className: 'text-success-600 font-semibold' }, 'Completed')
            )
          )
        ),

        // Quick Actions
        React.createElement('div', { className: 'bg-white rounded-xl shadow-sm p-6' },
          React.createElement('h3', { className: 'text-lg font-semibold text-gray-900 mb-4' }, 'Quick Actions'),
          React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
            React.createElement('button', { className: 'p-4 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors' },
              React.createElement('div', { className: 'font-medium' }, 'Start Workout'),
              React.createElement('div', { className: 'text-sm' }, 'Begin today\'s session')
            ),
            React.createElement('button', { className: 'p-4 bg-success-50 text-success-700 rounded-lg hover:bg-success-100 transition-colors' },
              React.createElement('div', { className: 'font-medium' }, 'View Progress'),
              React.createElement('div', { className: 'text-sm' }, 'Check your stats')
            ),
            React.createElement('button', { className: 'p-4 bg-warning-50 text-warning-700 rounded-lg hover:bg-warning-100 transition-colors' },
              React.createElement('div', { className: 'font-medium' }, 'Message Coach'),
              React.createElement('div', { className: 'text-sm' }, 'Get in touch')
            ),
            React.createElement('button', { className: 'p-4 bg-secondary-50 text-secondary-700 rounded-lg hover:bg-secondary-100 transition-colors' },
              React.createElement('div', { className: 'font-medium' }, 'Update Profile'),
              React.createElement('div', { className: 'text-sm' }, 'Edit your info')
            )
          )
        )
      )
    )
  )
}

export default AthleteDashboard
