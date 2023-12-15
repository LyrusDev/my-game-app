import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Background, Logo, Header, Button, TextInput, BackButton } from "../components";
// Librerias
import { Text, useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
// Validadores
import { emailValidator } from "../helpers/emailValidator";
import { nickValidator } from "../helpers/nickValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { ageValidator } from "../helpers/ageValidator";
// Autenticación
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from 'firebase/database'
import { auth, db } from "../helpers/ConfigDB";

export default function RegisterScreen({ navigation }: any) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [email, setEmail] = useState({ value: "", error: "" });
  const [nick, setNick] = useState({ value: "", error: "" });
  const [age, setAge] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  };

  const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed up
        const userUID = userCredential.user.uid;

        // Additional Data
        set(ref(db, 'users/'+ userUID), {
          age: age.value,
          nick: nick.value,
        })

        navigation.reset({
          index: 0,
          routes: [{ name: "BottomNav" }],
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
          default:
            Alert.alert("ERROR", "Intente de nuevo más tarde");
            break;
        }
      });
    setEmail({ value: "", error: "" });
    setNick({ value: "", error: "" });
    setAge({ value: "", error: "" });
    setPassword({ value: "", error: "" });
  };

  const onSignUpPressed = () => {
    const emailError = emailValidator(email.value);
    const nickError = nickValidator(nick.value);
    const ageError = ageValidator(age.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || nickError || ageError || passwordError) {
      setEmail({ ...email, error: emailError });
      setNick({ ...nick, error: nickError });
      setAge({ ...age, error: ageError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    register();
  };

  return (
    <Background>
      <BackButton goBack={() => goBack()} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Correo"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text: string) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Nick"
        returnKeyType="next"
        value={nick.value}
        onChangeText={(text: string) => setNick({ value: text, error: "" })}
        error={!!nick.error}
        errorText={nick.error}
      />
      <TextInput
        label="Edad"
        returnKeyType="next"
        value={age.value}
        onChangeText={(text: string) => setAge({ value: text, error: "" })}
        error={!!age.error}
        errorText={age.error}
      />
      <TextInput
        label="Contraseña"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text: string) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button mode="outlined" onPress={onSignUpPressed} style={{ marginTop: 24 }}>
        Registrarse
      </Button>
      <View style={styles.row}>
        <Text style={styles.text}>¿Ya tiene una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text style={styles.link}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const makeStyles = (colors: MD3Colors) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      marginTop: 4,
    },
    link: {
      fontWeight: "bold",
      color: "#fff",
    },
    text: {
      fontSize: 13,
      color: "#fff",
    },
  });
