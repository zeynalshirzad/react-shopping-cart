import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import StoreProvider from './context/Store'
import { HelmetProvider } from 'react-helmet-async'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
    <HelmetProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </HelmetProvider>
  // {/* </React.StrictMode> */}
)
