import React from 'react'

class SignupView {
  constructor() {
    this.steps = [
      'email',
      'email-pin', 
      'password',
      'name',
      'account-type'
    ]
  }

  renderEmailStep(props) {
    const { email, error, onEmailChange, onSubmit, isLoading } = props

    return React.createElement('div', { className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4' },
      React.createElement('div', { className: 'bg-white rounded-2xl shadow-xl p-8 w-full max-w-md' },
        React.createElement('div', { className: 'text-center mb-8' },
          React.createElement('h1', { className: 'text-3xl font-bold text-gray-900 mb-2' }, 'Welcome to Pro Athlete'),
          React.createElement('p', { className: 'text-gray-600' }, 'Enter your email to get started')
        ),
        React.createElement('form', { onSubmit, className: 'space-y-6' },
          React.createElement('div', null,
            React.createElement('label', { 
              htmlFor: 'email', 
              className: 'block text-sm font-medium text-gray-700 mb-2' 
            }, 'Email Address'),
            React.createElement('input', {
              type: 'email',
              id: 'email',
              value: email,
              onChange: onEmailChange,
              placeholder: 'Enter your email',
              className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
              required: true
            })
          ),
          error && React.createElement('div', { className: 'text-red-600 text-sm' }, error),
          React.createElement('button', {
            type: 'submit',
            disabled: isLoading,
            className: 'w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          }, isLoading ? 'Sending...' : 'Continue')
        )
      )
    )
  }

  renderEmailPinStep(props) {
    const { pin, error, onPinChange, onSubmit, onResend, isLoading } = props

    return React.createElement('div', { className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4' },
      React.createElement('div', { className: 'bg-white rounded-2xl shadow-xl p-8 w-full max-w-md' },
        React.createElement('div', { className: 'text-center mb-8' },
          React.createElement('h1', { className: 'text-3xl font-bold text-gray-900 mb-2' }, 'Check your email'),
          React.createElement('p', { className: 'text-gray-600' }, 'We sent you a 6-digit verification code')
        ),
        React.createElement('form', { onSubmit, className: 'space-y-6' },
          React.createElement('div', null,
            React.createElement('label', { 
              htmlFor: 'pin', 
              className: 'block text-sm font-medium text-gray-700 mb-2' 
            }, 'Verification Code'),
            React.createElement('input', {
              type: 'text',
              id: 'pin',
              value: pin,
              onChange: onPinChange,
              placeholder: 'Enter 6-digit code',
              className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-center text-lg tracking-wider',
              maxLength: 6,
              required: true
            })
          ),
          error && React.createElement('div', { className: 'text-red-600 text-sm' }, error),
          React.createElement('button', {
            type: 'submit',
            disabled: isLoading,
            className: 'w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          }, isLoading ? 'Verifying...' : 'Verify Code'),
          React.createElement('button', {
            type: 'button',
            onClick: onResend,
            className: 'w-full text-blue-600 py-2 text-sm hover:text-blue-700 transition-colors'
          }, 'Resend code')
        )
      )
    )
  }

  renderPasswordStep(props) {
    const { password, confirmPassword, error, onPasswordChange, onConfirmPasswordChange, onSubmit, isLoading } = props

    return React.createElement('div', { className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4' },
      React.createElement('div', { className: 'bg-white rounded-2xl shadow-xl p-8 w-full max-w-md' },
        React.createElement('div', { className: 'text-center mb-8' },
          React.createElement('h1', { className: 'text-3xl font-bold text-gray-900 mb-2' }, 'Create Password'),
          React.createElement('p', { className: 'text-gray-600' }, 'Choose a strong password for your account')
        ),
        React.createElement('form', { onSubmit, className: 'space-y-6' },
          React.createElement('div', null,
            React.createElement('label', { 
              htmlFor: 'password', 
              className: 'block text-sm font-medium text-gray-700 mb-2' 
            }, 'Password'),
            React.createElement('input', {
              type: 'password',
              id: 'password',
              value: password,
              onChange: onPasswordChange,
              placeholder: 'Enter password',
              className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
              required: true,
              minLength: 8
            })
          ),
          React.createElement('div', null,
            React.createElement('label', { 
              htmlFor: 'confirmPassword', 
              className: 'block text-sm font-medium text-gray-700 mb-2' 
            }, 'Confirm Password'),
            React.createElement('input', {
              type: 'password',
              id: 'confirmPassword',
              value: confirmPassword,
              onChange: onConfirmPasswordChange,
              placeholder: 'Confirm password',
              className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
              required: true
            })
          ),
          error && React.createElement('div', { className: 'text-red-600 text-sm' }, error),
          React.createElement('button', {
            type: 'submit',
            disabled: isLoading,
            className: 'w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          }, isLoading ? 'Creating...' : 'Continue')
        )
      )
    )
  }

  renderNameStep(props) {
    const { firstName, lastName, error, onFirstNameChange, onLastNameChange, onSubmit, isLoading } = props

    return React.createElement('div', { className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4' },
      React.createElement('div', { className: 'bg-white rounded-2xl shadow-xl p-8 w-full max-w-md' },
        React.createElement('div', { className: 'text-center mb-8' },
          React.createElement('h1', { className: 'text-3xl font-bold text-gray-900 mb-2' }, 'What\'s your name?'),
          React.createElement('p', { className: 'text-gray-600' }, 'Help us personalize your experience')
        ),
        React.createElement('form', { onSubmit, className: 'space-y-6' },
          React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
            React.createElement('div', null,
              React.createElement('label', { 
                htmlFor: 'firstName', 
                className: 'block text-sm font-medium text-gray-700 mb-2' 
              }, 'First Name'),
              React.createElement('input', {
                type: 'text',
                id: 'firstName',
                value: firstName,
                onChange: onFirstNameChange,
                placeholder: 'First name',
                className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
                required: true
              })
            ),
            React.createElement('div', null,
              React.createElement('label', { 
                htmlFor: 'lastName', 
                className: 'block text-sm font-medium text-gray-700 mb-2' 
              }, 'Last Name'),
              React.createElement('input', {
                type: 'text',
                id: 'lastName',
                value: lastName,
                onChange: onLastNameChange,
                placeholder: 'Last name',
                className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
                required: true
              })
            )
          ),
          error && React.createElement('div', { className: 'text-red-600 text-sm' }, error),
          React.createElement('button', {
            type: 'submit',
            disabled: isLoading,
            className: 'w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          }, isLoading ? 'Saving...' : 'Continue')
        )
      )
    )
  }

  renderAccountTypeStep(props) {
    const { accountType, error, onAccountTypeSelect, onSubmit, isLoading } = props

    return React.createElement('div', { className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4' },
      React.createElement('div', { className: 'bg-white rounded-2xl shadow-xl p-8 w-full max-w-md' },
        React.createElement('div', { className: 'text-center mb-8' },
          React.createElement('h1', { className: 'text-3xl font-bold text-gray-900 mb-2' }, 'Choose your role'),
          React.createElement('p', { className: 'text-gray-600' }, 'Are you an athlete or coach?')
        ),
        React.createElement('form', { onSubmit, className: 'space-y-6' },
          React.createElement('div', { className: 'space-y-4' },
            React.createElement('button', {
              type: 'button',
              onClick: () => onAccountTypeSelect('athlete'),
              className: `w-full p-6 border-2 rounded-lg text-left transition-colors ${
                accountType === 'athlete' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`
            },
              React.createElement('div', { className: 'flex items-center' },
                React.createElement('div', { className: 'text-2xl mr-4' }, '🏃‍♂️'),
                React.createElement('div', null,
                  React.createElement('h3', { className: 'font-semibold text-gray-900' }, 'Athlete'),
                  React.createElement('p', { className: 'text-gray-600 text-sm' }, 'Track your fitness and follow programs')
                )
              )
            ),
            React.createElement('button', {
              type: 'button',
              onClick: () => onAccountTypeSelect('coach'),
              className: `w-full p-6 border-2 rounded-lg text-left transition-colors ${
                accountType === 'coach' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`
            },
              React.createElement('div', { className: 'flex items-center' },
                React.createElement('div', { className: 'text-2xl mr-4' }, '👨‍💼'),
                React.createElement('div', null,
                  React.createElement('h3', { className: 'font-semibold text-gray-900' }, 'Coach'),
                  React.createElement('p', { className: 'text-gray-600 text-sm' }, 'Manage teams and create programs')
                )
              )
            )
          ),
          error && React.createElement('div', { className: 'text-red-600 text-sm' }, error),
          React.createElement('button', {
            type: 'submit',
            disabled: isLoading || !accountType,
            className: 'w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          }, isLoading ? 'Creating Account...' : 'Create Account')
        )
      )
    )
  }

  render(step, props) {
    switch (step) {
      case 'email':
        return this.renderEmailStep(props)
      case 'email-pin':
        return this.renderEmailPinStep(props)
      case 'password':
        return this.renderPasswordStep(props)
      case 'name':
        return this.renderNameStep(props)
      case 'account-type':
        return this.renderAccountTypeStep(props)
      default:
        return React.createElement('div', { className: 'min-h-screen flex items-center justify-center' },
          React.createElement('div', { className: 'text-center' },
            React.createElement('h1', { className: 'text-2xl font-bold text-gray-900' }, 'Invalid step')
          )
        )
    }
  }
}

export default SignupView