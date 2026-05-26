import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { scan } from 'react-scan'

import { App } from './app'
import { env } from './config'

import './index.css'

scan({ enabled: env.VITE_REACT_SCAN as boolean })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
