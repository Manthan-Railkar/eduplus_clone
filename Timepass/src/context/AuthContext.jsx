import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial sync with localStorage on mount
    const currentUser = authService.getCurrentUser()
    const authed = authService.isAuthenticated()
    if (authed && currentUser) {
      setUser(currentUser)
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (username, password) => {
    setLoading(true)
    try {
      const response = await authService.login(username, password)
      setUser(response.user)
      setIsAuthenticated(true)
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message || 'Invalid credentials' }
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
    setIsAuthenticated(false)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
