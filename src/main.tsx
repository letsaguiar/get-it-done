import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './router'
import './translation'

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)