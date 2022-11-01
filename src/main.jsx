import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { TermoProvider } from './components/context/'
let l = 0;
localStorage.setItem("linha_h",JSON.stringify(l))
ReactDOM.createRoot(document.getElementById('root')).render(
      <TermoProvider>
        <App />
      </TermoProvider>
)
