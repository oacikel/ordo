import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import tr from 'app/assets/locales/tr.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      tr: {
        translation: tr
      }
    },
    lng: 'tr', // default language
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n