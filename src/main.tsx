import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RenderLogProvider } from 'react-render-log'
import { scan } from 'react-scan'

import { App } from './app'
import { env } from './config'

import './index.css'

scan({ enabled: env.VITE_REACT_SCAN as boolean })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RenderLogProvider debugEnabled={env.VITE_RENDER_LOG as boolean} isStrictMode={true}>
      <App />
    </RenderLogProvider>
  </StrictMode>
)
