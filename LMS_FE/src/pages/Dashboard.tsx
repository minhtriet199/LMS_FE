import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/useAuth'

export default function Dashboard() {
  const { t } = useTranslation()
  const { user } = useAuth()
  if (!user) return null

  return (
    <section className="card">
      <h1>{t('dashboard.welcome', { name: user.name })}</h1>
      <p className="muted">
        {user.email} · {t(`role.${user.role}`)}
      </p>
    </section>
  )
}
