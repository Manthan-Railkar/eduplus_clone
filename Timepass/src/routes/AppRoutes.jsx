import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Login from '../pages/Login/Login'
import Dashboard from '../pages/Dashboard/Dashboard'
import Examination from '../pages/Examination/Examination'
import ProtectedRoute from './ProtectedRoute'

function LoginGuard() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '16px',
        color: '#2437C6'
      }}>
        Syncing session...
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Login />
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public route / guarded for authed users */}
      <Route path="/" element={<LoginGuard />} />

      {/* Protected dashboard route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected examination sub-page */}
      <Route
        path="/dashboard/examination"
        element={
          <ProtectedRoute>
            <Examination />
          </ProtectedRoute>
        }
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes

