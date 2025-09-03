import React from 'react'

class SignupView {
  constructor() {
    this.stepNames = {
      1: 'Email',
      2: 'Verification', 
      3: 'Password',
      4: 'Name',
      5: 'Account Type'
    }
  }

  renderEmailStep(email, onEmailChange, onSubmit) {
    return React.createElement('div', { className: 'min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8' },
      React.createElement('div', { className: 'sm:mx-auto sm:w-full sm:max-w-md' },
        React.createElement('h2', { className: 'mt-6 text-center text-3xl font-extrabold text-gray-900' },
          'Create your account'
        ),
        React.createElement('p', { className: 'mt-2 text-center text-sm text-gray-600' },
          'Enter your email to get started'
        )
      ),
      React.createElement('div', { className: 'mt-8 sm:mx-auto sm:w-full sm:max-w-md' },
        React.createElement('div', { className: 'bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10' },
          React.createElement('form', { onSubmit: onSubmit, className: 'space-y-6' },
            React.createElement('div', null,
              React.createElement('label', { 
                htmlFor: 'email',
                className: 'block text-sm font-medium text-gray-700'
              }, 'Email address'),
              React.createElement('div', { className: 'mt-1' },
                React.createElement('input', {
                  id: 'email',
                  name: 'email',
                  type: 'email',
                  autoComplete: 'email',
                  required: true,
                  value: email,
                  onChange: onEmailChange,
                  className: 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                })
              )
            ),
            React.createElement('div', null,
              React.createElement('button', {
                type: 'submit',
                className: 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }, 'Continue')
            )
          )
        )
      )
    )
  }

  renderVerificationStep(pin, onPinChange, onSubmit, onResend) {
    return React.createElement('div', { className: 'min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8' },
      React.createElement('div', { className: 'sm:mx-auto sm:w-full sm:max-w-md' },
        React.createElement('h2', { className: 'mt-6 text-center text-3xl font-extrabold text-gray-900' },
          'Verify your email'
        ),
        React.createElement('p', { className: 'mt-2 text-center text-sm text-gray-600' },
          'Enter the 6-digit code sent to your email'
        )
      ),
      React.createElement('div', { className: 'mt-8 sm:mx-auto sm:w-full sm:max-w-md' },
        React.createElement('div', { className: 'bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10' },
          React.createElement('form', { onSubmit: onSubmit, className: 'space-y-6' },
            React.createElement('div', null,
              React.createElement('label', { 
                htmlFor: 'pin',
                className: 'block text-sm font-medium text-gray-700'
              }, 'Verification Code'),
              React.createElement('div', { className: 'mt-1' },
                React.createElement('input', {
                  id: 'pin',
                  name: 'pin',
                  type: 'text',
                  maxLength: 6,
                  required: true,
                  value: pin,
                  onChange: onPinChange,
                  className: 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center text-lg tracking-widest'
                })
              )
            ),
            React.createElement('div', null,
              React.createElement('button', {
                type: 'submit',
                className: 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }, 'Verify')
            ),
            onResend && React.createElement('div', { className: 'text-center' },
              React.createElement('button', {
                type: 'button',
                onClick: onResend,
                className: 'text-sm text-blue-600 hover:text-blue-500'
              }, 'Resend code')
            )
          )
        )
      )
    )
  }

  renderPasswordStep(password, onPasswordChange, onSubmit) {
    return React.createElement('div', { className: 'min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8' },
      React.createElement('div', { className: 'sm:mx-auto sm:w-full sm:max-w-md' },
        React.createElement('h2', { className: 'mt-6 text-center text-3xl font-extrabold text-gray-900' },
          'Create a password'
        ),
        React.createElement('p', { className: 'mt-2 text-center text-sm text-gray-600' },
          'Choose a strong password for your account'
        )
      ),
      React.createElement('div', { className: 'mt-8 sm:mx-auto sm:w-full sm:max-w-md' },
        React.createElement('div', { className: 'bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10' },
          React.createElement('form', { onSubmit: onSubmit, className: 'space-y-6' },
            React.createElement('div', null,
              React.createElement('label', { 
                htmlFor: 'password',
                className: 'block text-sm font-medium text-gray-700'
              }, 'Password'),
              React.createElement('div', { className: 'mt-1' },
                React.createElement('input', {
                  id: 'password',
                  name: 'password',
                  type: 'password',
                  autoComplete: 'new-password',
                  required: true,
                  value: password,
                  onChange: onPasswordChange,
                  className: 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                })
              )
            ),
            React.createElement('div', null,
              React.createElement('button', {
                type: 'submit',
                className: 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }, 'Continue')
            )
          )
        )
      )
    )
  }

  renderNameStep(firstName, lastName, onFirstNameChange, onLastNameChange, onSubmit) {
    return React.createElement('div', { className: 'min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8' },
      React.createElement('div', { className: 'sm:mx-auto sm:w-full sm:max-w-md' },
        React.createElement('h2', { className: 'mt-6 text-center text-3xl font-extrabold text-gray-900' },
          'What\'s your name?'
        ),
        React.createElement('p', { className: 'mt-2 text-center text-sm text-gray-600' },
          'Tell us your first and last name'
        )
      ),
      React.createElement('div', { className: 'mt-8 sm:mx-auto sm:w-full sm:max-w-md' },
        React.createElement('div', { className: 'bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10' },
          React.createElement('form', { onSubmit: onSubmit, className: 'space-y-6' },
            React.createElement('div', null,
              React.createElement('label', { 
                htmlFor: 'firstName',
                className: 'block text-sm font-medium text-gray-700'
              }, 'First Name'),
              React.createElement('div', { className: 'mt-1' },
                React.createElement('input', {
                  id: 'firstName',
                  name: 'firstName',
                  type: 'text',
                  autoComplete: 'given-name',
                  required: true,
                  value: firstName,
                  onChange: onFirstNameChange,
                  className: 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                })
              )
            ),
            React.createElement('div', null,
              React.createElement('label', { 
                htmlFor: 'lastName',
                className: 'block text-sm font-medium text-gray-700'
              }, 'Last Name'),
              React.createElement('div', { className: 'mt-1' },
                React.createElement('input', {
                  id: 'lastName',
                  name: 'lastName',
                  type: 'text',
                  autoComplete: 'family-name',
                  required: true,
                  value: lastName,
                  onChange: onLastNameChange,
                  className: 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                })
              )
            ),
            React.createElement('div', null,
              React.createElement('button', {
                type: 'submit',
                className: 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }, 'Continue')
            )
          )
        )
      )
    )
  }

  renderAccountTypeStep(accountType, onAccountTypeChange, onSubmit) {
    return React.createElement('div', { className: 'min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8' },
      React.createElement('div', { className: 'sm:mx-auto sm:w-full sm:max-w-md' },
        React.createElement('h2', { className: 'mt-6 text-center text-3xl font-extrabold text-gray-900' },
          'Choose your account type'
        ),
        React.createElement('p', { className: 'mt-2 text-center text-sm text-gray-600' },
          'Are you an athlete or a coach?'
        )
      ),
      React.createElement('div', { className: 'mt-8 sm:mx-auto sm:w-full sm:max-w-md' },
        React.createElement('div', { className: 'bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10' },
          React.createElement('form', { onSubmit: onSubmit, className: 'space-y-6' },
            React.createElement('div', { className: 'space-y-4' },
              React.createElement('div', null,
                React.createElement('label', { className: 'flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50' },
                  React.createElement('input', {
                    type: 'radio',
                    name: 'accountType',
                    value: 'athlete',
                    checked: accountType === 'athlete',
                    onChange: onAccountTypeChange,
                    className: 'mr-3'
                  }),
                  React.createElement('div', null,
                    React.createElement('div', { className: 'font-medium' }, 'Athlete'),
                    React.createElement('div', { className: 'text-sm text-gray-500' }, 'Track your training and progress')
                  )
                )
              ),
              React.createElement('div', null,
                React.createElement('label', { className: 'flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50' },
                  React.createElement('input', {
                    type: 'radio',
                    name: 'accountType',
                    value: 'coach',
                    checked: accountType === 'coach',
                    onChange: onAccountTypeChange,
                    className: 'mr-3'
                  }),
                  React.createElement('div', null,
                    React.createElement('div', { className: 'font-medium' }, 'Coach'),
                    React.createElement('div', { className: 'text-sm text-gray-500' }, 'Manage teams and athletes')
                  )
                )
              )
            ),
            React.createElement('div', null,
              React.createElement('button', {
                type: 'submit',
                disabled: !accountType,
                className: 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed'
              }, 'Create Account')
            )
          )
        )
      )
    )
  }
}

export default SignupView