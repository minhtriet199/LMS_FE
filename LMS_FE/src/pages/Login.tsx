import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { useAuth } from '../context/useAuth'

export default function Login() {
  const { t } = useTranslation()
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/dashboard'

  if (user) return <Navigate to={from} replace />

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login({ email, password })
      navigate(from, { replace: true })
    } catch {
      setError(t('login.invalid'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <form className="card login-card" onSubmit={handleSubmit}>
        <div className="login-card__header">
          <h1>{t('login.title')}</h1>
          <LanguageSwitcher />
        </div>
        <label>
          {t('login.email')}
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
        </label>
        <label>
          {t('login.password')}
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn" disabled={submitting}>
          {submitting ? t('login.submitting') : t('login.submit')}
        </button>
        {import.meta.env.DEV && <p className="muted small">{t('login.demoHint')}</p>}
      </form>
    </div>
  )
}
