import React from 'react'
import AppNavigation from 'src/navigation'
import { Provider as PaperProvider } from 'react-native-paper'
import { enableScreens } from 'react-native-screens'

import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

export default function App() {
  enableScreens(false)
  return (
    <I18nextProvider i18n={i18n}>
      <PaperProvider>
        <AppNavigation />
      </PaperProvider>
    </I18nextProvider>
  )
}
