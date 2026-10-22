import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

// Menu theo mockup. Trang nào chưa làm thì để path: null (hiện mờ, không bấm được).
// Làm xong trang nào: thêm route trong routes/AppRoutes.tsx rồi điền path ở đây.
const NAV_ITEMS: { key: string; icon: string; path: string | null }[] = [
  { key: 'dashboard', icon: '⌂', path: '/dashboard' },
  { key: 'courses', icon: '▤', path: null },
  { key: 'learningPath', icon: '⤳', path: null },
  { key: 'schedule', icon: '▦', path: null },
  { key: 'grades', icon: '✎', path: null },
  { key: 'notifications', icon: '◔', path: null },
  { key: 'profile', icon: '◉', path: null },
]

export default function Sidebar() {
  const { t } = useTranslation()

  return (
    <aside className="sidebar">
      <div className="brand brand--light">🎓 {t('app.name')}</div>
      <nav className="sidebar__nav">
        {NAV_ITEMS.map(({ key, icon, path }) =>
          path ? (
            <NavLink key={key} to={path} className="sidebar__link">
              <span className="sidebar__icon">{icon}</span>
              {t(`nav.${key}`)}
            </NavLink>
          ) : (
            <span key={key} className="sidebar__link is-disabled" title={t('nav.comingSoon')}>
              <span className="sidebar__icon">{icon}</span>
              {t(`nav.${key}`)}
            </span>
          ),
        )}
      </nav>
    </aside>
  )
}
