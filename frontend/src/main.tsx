import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './Routes';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>,
)
