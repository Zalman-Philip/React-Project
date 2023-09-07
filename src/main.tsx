import RouterContextProvider from './router/Router'
import IdContextProvider from './provider/IdContext.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterContextProvider>
      <IdContextProvider>
      <App />
    </IdContextProvider>
    </RouterContextProvider>
  </React.StrictMode>,
)
