import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './store/AuthContext.js'
import ProtectedRoute from './components/auth/ProtectedRoute.js'
import AthleteProtectedRoute from './components/auth/AthleteProtectedRoute.js'
import CoachProtectedRoute from './components/auth/CoachProtectedRoute.js'

// Auth pages
import Login from './pages/auth/Login.js'
import ForgotPassword from './pages/auth/ForgotPassword.js'

// Signup pages
import Email from './pages/auth/signup/Email.js'
import EmailPin from './pages/auth/signup/EmailPin.js'
import Password from './pages/auth/signup/Password.js'
import Name from './pages/auth/signup/Name.js'
import AccountType from './pages/auth/signup/AccountType.js'

// Other pages
import SplashScreen from './pages/SplashScreen.js'
import Welcome from './pages/onboarding/Welcome.js'
import NotFound from './pages/NotFound.js'

// Athlete pages
import AthleteDashboard from './pages/athlete/Dashboard.js'
import AthleteProfile from './pages/athlete/Profile.js'
import AthleteWorkouts from './pages/athlete/Workouts.js'
import AthleteProgress from './pages/athlete/Progress.js'

// Coach pages
import CoachDashboard from './pages/coach/Dashboard.js'
import CoachAthletes from './pages/coach/Athletes.js'
import CoachWorkouts from './pages/coach/Workouts.js'
import CoachProfile from './pages/coach/Profile.js'

class AppRouter {
  constructor() {
    this.routes = this.initializeRoutes()
  }

  initializeRoutes() {
    return [
      // Public routes
      { path: '/', element: React.createElement(SplashScreen) },
      { path: '/onboarding/welcome', element: React.createElement(Welcome) },
      { path: '/login', element: React.createElement(Login) },
      { path: '/forgot-password', element: React.createElement(ForgotPassword) },
      
      // Signup routes
      { path: '/signup', element: React.createElement(Email) },
      { path: '/signup/email-pin', element: React.createElement(EmailPin) },
      { path: '/signup/password', element: React.createElement(Password) },
      { path: '/signup/name', element: React.createElement(Name) },
      { path: '/signup/account-type', element: React.createElement(AccountType) },
      
      // Protected athlete routes
      { 
        path: '/athlete/dashboard', 
        element: React.createElement(AthleteProtectedRoute, null, React.createElement(AthleteDashboard))
      },
      { 
        path: '/athlete/profile', 
        element: React.createElement(AthleteProtectedRoute, null, React.createElement(AthleteProfile))
      },
      { 
        path: '/athlete/workouts', 
        element: React.createElement(AthleteProtectedRoute, null, React.createElement(AthleteWorkouts))
      },
      { 
        path: '/athlete/progress', 
        element: React.createElement(AthleteProtectedRoute, null, React.createElement(AthleteProgress))
      },
      
      // Protected coach routes
      { 
        path: '/coach/dashboard', 
        element: React.createElement(CoachProtectedRoute, null, React.createElement(CoachDashboard))
      },
      { 
        path: '/coach/athletes', 
        element: React.createElement(CoachProtectedRoute, null, React.createElement(CoachAthletes))
      },
      { 
        path: '/coach/workouts', 
        element: React.createElement(CoachProtectedRoute, null, React.createElement(CoachWorkouts))
      },
      { 
        path: '/coach/profile', 
        element: React.createElement(CoachProtectedRoute, null, React.createElement(CoachProfile))
      },
      
      // 404 route
      { path: '*', element: React.createElement(NotFound) }
    ]
  }

  renderRoutes() {
    return this.routes.map((route, index) => 
      React.createElement(Route, {
        key: index,
        path: route.path,
        element: route.element
      })
    )
  }
}

class AppView {
  constructor(router) {
    this.router = router
  }

  render() {
    return React.createElement(Router, null,
      React.createElement(AuthProvider, null,
        React.createElement('div', { className: 'App' },
          React.createElement(Routes, null, ...this.router.renderRoutes())
        )
      )
    )
  }
}

function App() {
  const router = new AppRouter()
  const view = new AppView(router)
  
  return view.render()
}

export default App
