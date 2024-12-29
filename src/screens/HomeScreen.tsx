import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

import { NavigationProp } from '@react-navigation/native'

interface HomeScreenProps {
  navigation: NavigationProp<any>
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ana Sayfa (Homepage)</Text>
      <Button title="Go to File Details" onPress={() => navigation.navigate('FileDetails')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
})
