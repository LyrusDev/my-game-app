import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../helpers/ConfigDB";

export default function HomeScreen({ navigation }: any) {
  console.log(auth)
  const email = auth.currentUser.email
  const logout = () => {
    signOut(auth)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      })
      .catch((error) => {
        Alert.alert("ERROR", "Ha ocurrido un error, intentelo mas luego");
      });
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, textAlign: "center" }}>Bienvenido</Text>
      <Text style={{ fontSize: 15, textAlign: "center" }}>{email}</Text>
      <Button title="Cerrar Sesión" onPress={() => logout()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "45%",
    paddingLeft: 40,
    paddingRight: 40,
  },
});
