import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext.js'

const AthleteProtectedRoute = ({ children }) => {
  const { user } = useAuth()

  if (!user || user.userType !== 'athlete') {
    return React.createElement(Navigate, { to: '/login', replace: true })
  }

  return children
}

export default AthleteProtectedRoute
