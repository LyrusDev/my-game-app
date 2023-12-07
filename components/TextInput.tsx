import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input, useTheme } from 'react-native-paper'
import { MD3Colors } from 'react-native-paper/lib/typescript/types'

export default function TextInput ({ errorText, description, ...props }:any) {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText
        ? (
        <Text style={styles.description}>{description}</Text>
          )
        : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const makeStyles = (colors: MD3Colors) => StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12
  },
  input: {
    backgroundColor: colors.surface
  },
  description: {
    fontSize: 13,
    color: colors.secondary,
    paddingTop: 8
  },
  error: {
    fontSize: 13,
    color: colors.error,
    paddingTop: 8
  }
})
