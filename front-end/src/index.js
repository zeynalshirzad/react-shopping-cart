import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import StoreProvider from './context/Store'
import { HelmetProvider } from 'react-helmet-async'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true}>
          <App />
        </PayPalScriptProvider>
      </StoreProvider>
    </HelmetProvider>
  </React.StrictMode>
)
