import { createContext, useState, useEffect, useContext } from 'react'
import authService from '../services/authService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken')
      if (token) {
        try {
          const profile = await authService.getProfile()
          setUser(profile)
          setIsAuthenticated(true)
        } catch (error) {
          console.error('Failed to validate token:', error)
          localStorage.removeItem('adminToken')
          setUser(null)
          setIsAuthenticated(false)
        }
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    try {
      const data = await authService.login(email, password)
      localStorage.setItem('adminToken', data.token)
      setUser({ email: data.email, role: data.role })
      setIsAuthenticated(true)
      setLoading(false)
      return { success: true }
    } catch (error) {
      setLoading(false)
      const msg = error.response?.data?.message || 'Login failed. Please check credentials.'
      return { success: false, message: msg }
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (e) {
      console.warn('Backend logout response skipped/stateless cleanup completed.')
    } finally {
      localStorage.removeItem('adminToken')
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
