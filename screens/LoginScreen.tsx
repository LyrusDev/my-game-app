import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

export default function LoginScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>Login</Text>

      <View style={styles.containerInput}>
        <TextInput placeholder="Ingresa tu nick" />
        <TextInput placeholder="Ingresa contraseña" />

        <View style={styles.containerBtn}>
          <TouchableOpacity style={styles.btnInput} onPress={() => navigation.navigate("Registro")}>
            <Text>Ir a Registro</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center"
  },
  txtTitle: {
    textAlign: "center",
    marginTop: 200,
    paddingBottom: 20,
    fontSize: 24,
    fontWeight: "500",
  },
  containerInput: {
    paddingLeft: 50,
    gap: 20,
  },
  containerBtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnInput: {
    justifyContent: "center",
    alignItems: "center",
  }
});
