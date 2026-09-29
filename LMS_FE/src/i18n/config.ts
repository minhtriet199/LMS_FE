import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import vi from './locales/vi.json'

export const LANG_KEY = 'lms_lang'
export const SUPPORTED_LANGS = ['vi', 'en'] as const

const saved = localStorage.getItem(LANG_KEY)

void i18n.use(initReactI18next).init({
  resources: { vi: { translation: vi }, en: { translation: en } },
  lng: saved === 'en' ? 'en' : 'vi',
  fallbackLng: 'vi',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => {
  localStorage.setItem(LANG_KEY, lng)
  document.documentElement.lang = lng
})

export default i18n
