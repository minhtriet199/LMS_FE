import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import LanguageSwitcher from './LanguageSwitcher'

// Thanh trên cùng: đổi ngôn ngữ, thông tin user, đăng xuất.
export default function Navbar() {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout().catch(() => undefined)
    navigate('/login', { replace: true })
  }

  return (
    <header className="topbar">
      <LanguageSwitcher />
      {user && (
        <div className="topbar__user">
          <span className="avatar">{user.name.trim().split(/\s+/).pop()?.[0] ?? '?'}</span>
          <span>
            <strong>{user.name}</strong>
            <span className="muted small">{t(`role.${user.role}`)}</span>
          </span>
        </div>
      )}
      <button type="button" className="btn btn--ghost" onClick={handleLogout}>
        {t('nav.logout')}
      </button>
    </header>
  )
}
