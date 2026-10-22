import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/useAuth'

// Dashboard hiện để trống — các thẻ thống kê / biểu đồ sẽ thêm sau theo mockup.
export default function Dashboard() {
  const { t } = useTranslation()
  const { user } = useAuth()
  if (!user) return null

  return (
    <>
      <h1>{t('dashboard.welcome', { name: user.name })} 👋</h1>
      <p className="muted">{t('dashboard.subtitle')}</p>
      <section className="card empty-state">
        <p className="muted">{t('dashboard.empty')}</p>
      </section>
    </>
  )
}
