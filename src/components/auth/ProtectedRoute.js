import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext.js'

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return React.createElement('div', { className: 'min-h-screen flex items-center justify-center' },
      React.createElement('div', { className: 'animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600' })
    )
  }

  if (!isAuthenticated) {
    return React.createElement(Navigate, { to: '/login', state: { from: location }, replace: true })
  }

  return children
}

export default ProtectedRoute
