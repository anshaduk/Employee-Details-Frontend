import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import UserContext from './contextAPI/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <UserContext>
  <GoogleOAuthProvider clientId='137164252480-9ngi1t21ltuegd1uur9r20k3l3lfvost.apps.googleusercontent.com'>
  <BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>
  </GoogleOAuthProvider>,
  </UserContext>
)
