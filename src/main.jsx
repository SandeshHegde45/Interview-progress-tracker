import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import { TrackerProvider } from './context/TrackerContext.jsx'
import { applyTheme, getInitialTheme } from './utils/theme'

// Apply the saved/system theme before the first render to avoid a flash.
applyTheme(getInitialTheme())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TrackerProvider>
        <App />
      </TrackerProvider>
    </BrowserRouter>
  </StrictMode>,
)
