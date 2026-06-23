import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Lock, EyeOff, Eye } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import './LoginForm.css'

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await login(username, password)
      if (result.success) {
        navigate('/dashboard', { replace: true })
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-form" role="form" aria-label="Student login form">
      {/* Institute Logo */}
      <div className="login-form__logo-container">
        <img
          src="/logo.jpg"
          alt="Institute Logo"
          className="login-form__logo"
        />
      </div>

      {/* Heading */}
      <h1 className="login-form__heading">
        <span className="login-form__heading--blue">Student Sign-</span>
        <span className="login-form__heading--orange">In</span>
      </h1>

      {/* Error message */}
      {error && (
        <p className="login-form__error" role="alert">{error}</p>
      )}

      {/* Form */}
      <form className="login-form__form" onSubmit={handleSubmit}>
        {/* Username Field */}
        <div className="login-form__input-group">
          <span className="login-form__input-icon">
            <User size={18} strokeWidth={1.8} color="#9e9e9e" />
          </span>
          <input
            id="username"
            type="text"
            className="login-form__input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            disabled={loading}
            required
          />
        </div>

        {/* Password Field */}
        <div className="login-form__input-group">
          <span className="login-form__input-icon">
            <Lock size={18} strokeWidth={1.8} color="#9e9e9e" />
          </span>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            className="login-form__input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            disabled={loading}
            required
          />
          <button
            type="button"
            className="login-form__toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
            disabled={loading}
          >
            {showPassword ? (
              <Eye size={18} strokeWidth={1.8} color="#9e9e9e" />
            ) : (
              <EyeOff size={18} strokeWidth={1.8} color="#9e9e9e" />
            )}
          </button>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          id="sign-in-button"
          className="login-form__submit"
          disabled={loading}
        >
          {loading ? 'SIGNING IN...' : 'SIGN IN'}
        </button>
      </form>
    </div>
  )
}

export default LoginForm
