import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from 'src/screens/HomeScreen'
import FileDetailsScreen from 'src/screens/FileDetailsScreen'

const Stack = createStackNavigator()

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FileDetails" component={FileDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
