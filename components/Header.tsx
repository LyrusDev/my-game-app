import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { MD3Colors } from 'react-native-paper/lib/typescript/types'

export default function Header (props: any) {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  return <Text style={styles.header} {...props} />
}

const makeStyles = (colors: MD3Colors) => StyleSheet.create({
  header: {
    fontSize: 21,
    color: '#fff',
    fontWeight: 'bold',
    paddingVertical: 12
  }
})
