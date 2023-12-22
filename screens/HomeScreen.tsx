import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import GameScreen from "./GameScreen";
import { Background, Button } from "../components";
import { RadioButton } from "react-native-paper";

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }: any) => {
  const [gameLvl, setGameLvl] = useState("2000")
  const [insectChecked, setInsectChecked] = useState("ant");
  const [timeChecked, setTimeChecked] = useState("15");
  const [insectsNumber, setInsectsNumber] = useState("3")

  const gameOptions = {
    gameLvl: gameLvl,
    insect: insectChecked,
    time: timeChecked,
    insectsNumber: insectsNumber
  }

  return (
    <Background>
      <Text style={styles.title}>Ajustes del Juego</Text>
      <Text style={styles.subtitle}>Dificultad:</Text>
      <View style={styles.radioButtonContainer}>
        <Text style={styles.radioLabel}>Fàcil</Text>
        <RadioButton
          value="2000"
          status={gameLvl === "2000" ? "checked" : "unchecked"}
          onPress={() => setGameLvl("2000")}
        />
        <Text style={styles.radioLabel}>Intermedio</Text>
        <RadioButton
          value="1500"
          status={gameLvl === "1500" ? "checked" : "unchecked"}
          onPress={() => setGameLvl("1500")}
        />
        <Text style={styles.radioLabel}>Difícil</Text>
        <RadioButton
          value="1000"
          status={gameLvl === "1000" ? "checked" : "unchecked"}
          onPress={() => setGameLvl("1000")}
        />
      </View>
      <Text style={styles.subtitle}>Insecto:</Text>
      <View style={styles.radioButtonContainer}>
        <Text style={styles.radioLabel}>Hormiga</Text>
        <RadioButton
          value="ant"
          status={insectChecked === "ant" ? "checked" : "unchecked"}
          onPress={() => setInsectChecked("ant")}
        />
        <Text style={styles.radioLabel}>Araña</Text>
        <RadioButton
          value="spider"
          status={insectChecked === "spider" ? "checked" : "unchecked"}
          onPress={() => setInsectChecked("spider")}
        />
        <Text style={styles.radioLabel}>Cucaracha</Text>
        <RadioButton
          value="cockroach"
          status={insectChecked === "cockroach" ? "checked" : "unchecked"}
          onPress={() => setInsectChecked("cockroach")}
        />
      </View>
      <Text style={styles.subtitle}>Tiempo de juego:</Text>
      <View style={styles.radioButtonContainer}>
        <Text style={styles.radioLabel}>15 seg</Text>
        <RadioButton
          value="15"
          status={timeChecked === "15" ? "checked" : "unchecked"}
          onPress={() => setTimeChecked("15")}
        />
        <Text style={styles.radioLabel}>30 seg</Text>
        <RadioButton
          value="30"
          status={timeChecked === "30" ? "checked" : "unchecked"}
          onPress={() => setTimeChecked("30")}
        />
        <Text style={styles.radioLabel}>1 min</Text>
        <RadioButton
          value="60"
          status={timeChecked === "60" ? "checked" : "unchecked"}
          onPress={() => setTimeChecked("60")}
        />
      </View>
      <Text style={styles.subtitle}>Número de insectos:</Text>
      <View style={styles.radioButtonContainer}>
        <Text style={styles.radioLabel}>3</Text>
        <RadioButton
          value="3"
          status={insectsNumber === "3" ? "checked" : "unchecked"}
          onPress={() => setInsectsNumber("3")}
        />
        <Text style={styles.radioLabel}>5</Text>
        <RadioButton
          value="5"
          status={insectsNumber === "5" ? "checked" : "unchecked"}
          onPress={() => setInsectsNumber("5")}
        />
        <Text style={styles.radioLabel}>7</Text>
        <RadioButton
          value="7"
          status={insectsNumber === "7" ? "checked" : "unchecked"}
          onPress={() => setInsectsNumber("7")}
        />
        <Text style={styles.radioLabel}>10</Text>
        <RadioButton
          value="10"
          status={insectsNumber === "10" ? "checked" : "unchecked"}
          onPress={() => setInsectsNumber("10")}
        />
      </View>
      <Button mode="outlined" onPress={() => navigation.navigate("Game", gameOptions)}>
        Empezar
      </Button>
    </Background>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize:28,
    fontWeight: 'bold',
    color: '#fff'
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
    color: '#aaa'
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  radioLabel: {
    fontWeight: 'bold',
    color: '#aaa'
  }
});

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
    </Stack.Navigator>
  );
}
