import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGS } from '../i18n/config'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <select
      className="lang-switcher"
      value={i18n.language}
      onChange={(e) => void i18n.changeLanguage(e.target.value)}
      aria-label="Language"
    >
      {SUPPORTED_LANGS.map((lng) => (
        <option key={lng} value={lng}>
          {lng.toUpperCase()}
        </option>
      ))}
    </select>
  )
}
