import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Alert } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { Background, Logo, Header, TextInput, Button } from "../components";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../helpers/ConfigDB";

export default function LoginScreen({ navigation }: any) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const login = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Acceso correcto");

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
    setPassword({ value: "", error: "" });
  };

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    login();
  };

  return (
    <Background>
      <Logo />
      <Header>Bienvenido</Header>
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
        label="Contraseña"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text: string) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
          <Text style={styles.forgot}>¿Olvidó su contraseña?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="outlined" onPress={onLoginPressed}>
        Iniciar Sesión
      </Button>
      <View style={styles.row}>
        <Text style={styles.forgot}>¿No tiene una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Regístrese</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const makeStyles = (colors: MD3Colors) =>
  StyleSheet.create({
    forgotPassword: {
      width: "100%",
      alignItems: "flex-end",
      marginBottom: 24,
    },
    row: {
      flexDirection: "row",
      marginTop: 4,
    },
    forgot: {
      fontSize: 13,
      color: "#fff",
    },
    link: {
      fontWeight: "bold",
      color: "#fff",
    },
  });
