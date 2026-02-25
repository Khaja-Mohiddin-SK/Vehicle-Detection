import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext.jsx'

const basename = import.meta.env.VITE_BASE_PATH || "/"

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={basename}>
  <AppContextProvider>
     <App />
  </AppContextProvider> 
  </BrowserRouter>,
)
