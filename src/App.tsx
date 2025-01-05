import React from 'react'
import AppNavigation from 'src/navigation'
import { Provider as PaperProvider } from 'react-native-paper'
import { enableScreens } from 'react-native-screens'

export default function App() {
  enableScreens(false)
  return <PaperProvider>
    <AppNavigation />
  </PaperProvider>

}
