import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './css/theme.css'
import './css/layout.css'
import './css/components.css'
import './css/scrolltop.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Lightweight scroll listener to drive parallax via CSS variable
window.addEventListener('scroll', () => {
  const y = window.scrollY || 0;
  document.documentElement.style.setProperty('--scrollY', String(y));
});
