import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(React.StrictMode, null,
    React.createElement(BrowserRouter, { 
      future: { 
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }
    },
      React.createElement(App)
    )
  )
)
