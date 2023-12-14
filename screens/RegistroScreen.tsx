import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { Background, Logo, Header, Button, TextInput, BackButton } from '../components'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { MD3Colors } from 'react-native-paper/lib/typescript/types'
// Autenticación
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../helpers/ConfigDB";

export default function RegisterScreen ({ navigation }: any) {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      })
    }
  }

  const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }]
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
          case "auth/invalid-email":
            Alert.alert("ERROR", "Debe ingresar un correo válido");
            break;
          case "auth/weak-password":
            Alert.alert("ERROR", "La contraseña debe contener al menos 6 caracteres");
            break;
          default:
            Alert.alert("ERROR", "Verifique los datos ingresados");
            break;
        }
      });
    setName({ value: '', error: '' });
    setEmail({ value: '', error: '' });
    setPassword({ value: '', error: '' });
  }

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    register()
  }

  return (
    <Background>
      <BackButton goBack={() => goBack()} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Nombre"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text: string) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Correo"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text: string) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Contraseña"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text: string) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="outlined"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Registrarse
      </Button>
      <View style={styles.row}>
        <Text style={styles.text}>¿Ya tiene una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.link}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const makeStyles = (colors: MD3Colors) => StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4
  },
  link: {
    fontWeight: 'bold',
    color: '#fff'
  },
  text: {
    fontSize: 13,
    color: '#fff'
  }
})
