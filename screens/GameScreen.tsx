import React, { useState, useEffect } from "react";
import Constants from "expo-constants";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import Insect from "../components/Insect";
import MenuOptions from "../components/MenuOptions";
import { auth, db } from '../helpers/ConfigDB';
import { ref, update } from "firebase/database";

const { width, height } = Dimensions.get("window");

const GameScreen = ({navigation, route}: any) => {
  const insect = route.params.insect
  const time = route.params.time
  const insectsNumber = route.params.insectsNumber
  const gameLvl = Number(route.params.gameLvl)
  const [numInsects, setNumInsects] = useState(insectsNumber);
  const [endGame, setEndGame] = useState(false)

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(time);
  const [visibleMenu, setVisibleMenu] = useState(false);

  const showMenu = () => setVisibleMenu(true);
  const hideMenu = () => setVisibleMenu(false);

  const generateInsects = () => {
    const insects = [];
    for (let i = 0; i < numInsects; i++) {
      insects.push({
        id: i,
      });
    }
    return insects;
  };

  function uploadScore() {
    const userUID = auth.currentUser?.uid;
    update(ref(db, 'users/' + userUID), {
      score: score,
    })
  }

  const insects = generateInsects();

  useEffect(() => {

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime: number) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          setEndGame(true);
          uploadScore();
          showMenu();
          clearInterval(timerInterval);
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  const handlePress = () => {
    setScore(score + 1);
  };

  return (
    <ImageBackground style={styles.container} source={require('../assets/wood_texture.webp')}
    resizeMode="cover">
      <MenuOptions navigation={navigation} visible={visibleMenu} hideMenu={hideMenu} endGame={endGame}/>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Puntaje: {score}</Text>
        <TouchableOpacity onPress={showMenu}>
          <Image
            style={styles.pauseButton}
            source={require("../assets/pause.png")}
          />
        </TouchableOpacity>
        <Text style={styles.infoText}>Tiempo: {timeLeft}s</Text>
      </View>
      <View style={styles.gameArea}>
      {insects.map((insectItem) => (
      <Insect
        key={insectItem.id}
        onPress={handlePress}
        insect={insect}
        gameLvl={gameLvl}
      />
    ))}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gameArea: {
    width,
    height,
    marginTop: Constants.statusBarHeight + 25,
    position: "absolute",
  },
  insect: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: "absolute",
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: Constants.statusBarHeight,
    justifyContent: "space-between",
  },
  pauseButton: {
    width: 25,
    height: 25,
  },
  infoText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default GameScreen;
