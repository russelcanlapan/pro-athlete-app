import React from 'react'

const CoachDashboard = () => {
  return React.createElement('div', { className: 'min-h-screen bg-gray-50' },
    React.createElement('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8' },
      React.createElement('div', { className: 'mb-8' },
        React.createElement('h1', { className: 'text-3xl font-bold text-gray-900' }, 'Coach Dashboard'),
        React.createElement('p', { className: 'text-gray-600 mt-2' }, 'Manage your athletes and track team performance.')
      ),

      React.createElement('div', { className: 'grid grid-cols-1 lg:grid-cols-4 gap-8' },
        // Stats Cards
        React.createElement('div', { className: 'bg-white rounded-xl shadow-sm p-6' },
          React.createElement('h3', { className: 'text-lg font-semibold text-gray-900 mb-4' }, 'Total Athletes'),
          React.createElement('div', { className: 'text-3xl font-bold text-primary-600 mb-2' }, '24'),
          React.createElement('p', { className: 'text-gray-600' }, 'Active members')
        ),

        React.createElement('div', { className: 'bg-white rounded-xl shadow-sm p-6' },
          React.createElement('h3', { className: 'text-lg font-semibold text-gray-900 mb-4' }, 'This Week'),
          React.createElement('div', { className: 'text-3xl font-bold text-success-600 mb-2' }, '18'),
          React.createElement('p', { className: 'text-gray-600' }, 'Workouts completed')
        ),

        React.createElement('div', { className: 'bg-white rounded-xl shadow-sm p-6' },
          React.createElement('h3', { className: 'text-lg font-semibold text-gray-900 mb-4' }, 'Avg. Progress'),
          React.createElement('div', { className: 'text-3xl font-bold text-warning-600 mb-2' }, '+12%'),
          React.createElement('p', { className: 'text-gray-600' }, 'Performance gain')
        ),

        React.createElement('div', { className: 'bg-white rounded-xl shadow-sm p-6' },
          React.createElement('h3', { className: 'text-lg font-semibold text-gray-900 mb-4' }, 'Injuries'),
          React.createElement('div', { className: 'text-3xl font-bold text-error-600 mb-2' }, '2'),
          React.createElement('p', { className: 'text-gray-600' }, 'This month')
        )
      ),

      React.createElement('div', { className: 'grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8' },
        // Recent Activity
        React.createElement('div', { className: 'bg-white rounded-xl shadow-sm p-6' },
          React.createElement('h3', { className: 'text-lg font-semibold text-gray-900 mb-4' }, 'Recent Activity'),
          React.createElement('div', { className: 'space-y-4' },
            React.createElement('div', { className: 'flex items-center justify-between p-4 bg-gray-50 rounded-lg' },
              React.createElement('div', null,
                React.createElement('div', { className: 'font-medium text-gray-900' }, 'Sarah Johnson'),
                React.createElement('div', { className: 'text-sm text-gray-600' }, 'Completed Upper Body • 2 hours ago')
              ),
              React.createElement('div', { className: 'text-success-600 font-semibold' }, '✓')
            ),
            React.createElement('div', { className: 'flex items-center justify-between p-4 bg-gray-50 rounded-lg' },
              React.createElement('div', null,
                React.createElement('div', { className: 'font-medium text-gray-900' }, 'Mike Chen'),
                React.createElement('div', { className: 'text-sm text-gray-600' }, 'Started Cardio Session • 1 hour ago')
              ),
              React.createElement('div', { className: 'text-warning-600 font-semibold' }, '⟳')
            ),
            React.createElement('div', { className: 'flex items-center justify-between p-4 bg-gray-50 rounded-lg' },
              React.createElement('div', null,
                React.createElement('div', { className: 'font-medium text-gray-900' }, 'Alex Rodriguez'),
                React.createElement('div', { className: 'text-sm text-gray-600' }, 'Updated Progress • 3 hours ago')
              ),
              React.createElement('div', { className: 'text-primary-600 font-semibold' }, '📊')
            )
          )
        ),

        // Quick Actions
        React.createElement('div', { className: 'bg-white rounded-xl shadow-sm p-6' },
          React.createElement('h3', { className: 'text-lg font-semibold text-gray-900 mb-4' }, 'Quick Actions'),
          React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
            React.createElement('button', { className: 'p-4 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors' },
              React.createElement('div', { className: 'font-medium' }, 'Create Workout'),
              React.createElement('div', { className: 'text-sm' }, 'Design new program')
            ),
            React.createElement('button', { className: 'p-4 bg-success-50 text-success-700 rounded-lg hover:bg-success-100 transition-colors' },
              React.createElement('div', { className: 'font-medium' }, 'View Athletes'),
              React.createElement('div', { className: 'text-sm' }, 'Manage team')
            ),
            React.createElement('button', { className: 'p-4 bg-warning-50 text-warning-700 rounded-lg hover:bg-warning-100 transition-colors' },
              React.createElement('div', { className: 'font-medium' }, 'Analytics'),
              React.createElement('div', { className: 'text-sm' }, 'Team performance')
            ),
            React.createElement('button', { className: 'p-4 bg-secondary-50 text-secondary-700 rounded-lg hover:bg-secondary-100 transition-colors' },
              React.createElement('div', { className: 'font-medium' }, 'Messages'),
              React.createElement('div', { className: 'text-sm' }, 'Communicate')
            )
          )
        )
      )
    )
  )
}

export default CoachDashboard
