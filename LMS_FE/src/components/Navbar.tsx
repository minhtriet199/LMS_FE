import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout().catch(() => undefined)
    navigate('/login', { replace: true })
  }

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <span className="navbar__brand">{t('app.name')}</span>
        <nav className="navbar__links">
          <NavLink to="/dashboard">{t('nav.dashboard')}</NavLink>
        </nav>
        <div className="navbar__right">
          <LanguageSwitcher />
          {user && (
            <span className="navbar__user">
              {user.name} · {t(`role.${user.role}`)}
            </span>
          )}
          <button type="button" className="btn btn--ghost" onClick={handleLogout}>
            {t('nav.logout')}
          </button>
        </div>
      </div>
    </header>
  )
}
