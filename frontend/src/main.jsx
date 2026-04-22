import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SuperAdminPage from './pages/SuperAdminPage.jsx'

// If URL path is /admin, show the super admin page
const isAdminRoute = window.location.pathname === '/admin';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdminRoute ? <SuperAdminPage /> : <App />}
  </StrictMode>,
)
