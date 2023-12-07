import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function RegistroScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <Text>RegistroScreen</Text>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <Text>Ir a Login</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30
  }
})