import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { TermoProvider } from './components/context/'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <TermoProvider>
        <App />
      </TermoProvider>
  </React.StrictMode>
)
