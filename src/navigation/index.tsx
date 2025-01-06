import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from 'src/screens/HomeScreen'
import FileDetailsScreen from 'src/screens/FileDetailsScreen'
import { TabType } from 'src/types'

export type ParamList = {
    Home: undefined
    FileDetails: {
        fileId: string | null
        isEditMode: boolean
        initialTab: TabType
    },
}

const Stack = createStackNavigator<ParamList>()

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FileDetails" component={FileDetailsScreen}
         />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
