import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

/* Redirects unauthenticated users to the login page */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
