import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      navigate('/onboarding/welcome')
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate])

  return React.createElement('div', { className: 'min-h-screen bg-[#1e3a8a] flex items-center justify-center' },
    React.createElement('div', { className: 'text-center' },
      React.createElement('div', { className: 'mb-8' },
        React.createElement('img', {
          src: '/images/PA-logo_blanc.png?v=2',
          alt: 'Pro Athlete Logo',
          className: 'w-32 h-32 mx-auto shadow-lg bg-blue-600 rounded-lg p-4'
        })
      ),
      React.createElement('div', { className: 'text-white text-lg font-medium' }, 'Loading...')
    )
  )
}

export default SplashScreen
