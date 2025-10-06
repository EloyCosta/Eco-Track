import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// ✅ IMPORTAR NOSSO AUTH PROVIDER
import { AuthProvider } from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* ✅ ENVOLVER A APP COM O PROVIDER */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)