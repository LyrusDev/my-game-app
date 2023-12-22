import React from "react";
import { Text, StyleSheet } from "react-native";
import { Modal, Portal } from "react-native-paper";
import Button from "./Button";

export default function MenuOptions({ navigation, visible, hideMenu, endGame }: any) {

  const handleHome = () => {
    hideMenu()
    navigation.navigate("Home")
  } 

  const handleProfile = () => {
    hideMenu()
    navigation.navigate("Profile")
  } 

  const handleScore = () => {
    hideMenu()
    navigation.navigate("Score")
  } 

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideMenu}
        contentContainerStyle={containerStyle}
        style={styles.menuContainer}
        dismissable={false}
      >
        <Text style={styles.title}>Menu</Text>
        {!endGame && <Button mode="outlined" onPress={hideMenu}>
          Continuar
        </Button>}
        <Button mode="outlined" onPress={handleHome}>
          Inicio
        </Button>
        <Button mode="outlined" onPress={handleProfile}>
          Perfil
        </Button>
        <Button mode="outlined" onPress={handleScore}>
          Puntajes
        </Button>
      </Modal>
    </Portal>
  );
}

const containerStyle = {
  backgroundColor: "#A1662F",
  padding: 20,
  with: 10,
};

const styles = StyleSheet.create({
  menuContainer: {
    marginHorizontal: 50,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
