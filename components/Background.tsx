import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { useTheme } from 'react-native-paper'
import { MD3Colors } from 'react-native-paper/lib/typescript/types'

export default function Background ({ children }: any) {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  return (
    <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const makeStyles = (colors: MD3Colors) => StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.surface
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
