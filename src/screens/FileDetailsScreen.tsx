import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function FileDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dosya Bilgileri (File Details)</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
})
