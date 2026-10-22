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
      <div className="login-shell">
        <aside className="login-hero">
          <div className="brand">🎓 {t('app.name')}</div>
          <p className="login-hero__tagline">
            {t('login.tagline1')}
            <br />
            {t('login.tagline2')}
          </p>
          <div className="login-hero__art" aria-hidden="true">👩‍💻</div>
        </aside>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form__lang">
            <LanguageSwitcher />
          </div>
          <h1>{t('login.title')}</h1>
          <p className="muted login-form__subtitle">{t('login.subtitle')}</p>
          <label>
            {t('login.email')}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@lms.dev"
              autoComplete="username"
              autoFocus
            />
          </label>
          <label>
            {t('login.password')}
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn btn--block" disabled={submitting}>
            {submitting ? t('login.submitting') : t('login.submit')}
          </button>
          {import.meta.env.DEV && <p className="muted small">{t('login.demoHint')}</p>}
        </form>
      </div>
    </div>
  )
}
