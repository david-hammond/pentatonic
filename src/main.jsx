import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import eruda from 'eruda'

// Enable mobile console on mobile devices
if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
  eruda.init()
  console.log('📱 Eruda mobile console enabled - tap icon in bottom right corner')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
