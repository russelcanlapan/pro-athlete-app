import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext.js'

export const CoachProtectedRoute = ({ children }) => {
  const { user } = useAuth()

  if (!user || user.userType !== 'coach') {
    return React.createElement(Navigate, { to: '/login', replace: true })
  }

  return children
}
