import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function ErrorPage({ kind }: { kind: 'forbidden' | 'notFound' }) {
  const { t } = useTranslation()
  return (
    <section className="card">
      <h1>{kind === 'forbidden' ? '403' : '404'}</h1>
      <p>{t(`errors.${kind}`)}</p>
      <Link to="/dashboard">{t('errors.backHome')}</Link>
    </section>
  )
}
