import { Alert, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// Librerias
import { Button, Dialog, Portal, PaperProvider, Text as PaperText, useTheme } from 'react-native-paper'
import { MD3Colors } from 'react-native-paper/lib/typescript/types'
// Image Picker
import * as ImagePicker from "expo-image-picker";
// FIREBASE
import { storage, auth, db } from '../helpers/ConfigDB';
import { signOut } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";
import { onValue, ref as refDatabase, get } from "firebase/database";

export default function ProfileScreen({ navigation }: any) {
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [profile, setProfile] = useState<string | null>(null);
  const [email, setEmail] = useState({ value: "", error: "" });
  const [nick, setNick] = useState({ value: "", error: "" });
  const [age, setAge] = useState({ value: "", error: "" });
  // const [password, setPassword] = useState({ value: "", error: "" });

  const { colors } = useTheme()
  const styles = makeStyles(colors)

  // LogOut Dialog
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
        console.log('Salio del sistema');
      })
      .catch((error) => {
        Alert.alert("ERROR", "Ha ocurrido un error, intentelo mas luego");
      });
  }

  // Obtener datos
  const initialData = () => {
    const userUID = auth.currentUser?.uid;
    setEmail({ value: auth.currentUser?.email ?? "", error: "" });
    const userRef = refDatabase(db, "/users/" + userUID);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          console.log("Datos del usuario:", userData);
          setAge({ value: snapshot.val().age, error: "" });
          setNick({ value: snapshot.val().nick, error: "" });
          setProfile(snapshot.val().nick);
        } else {
          console.log("El usuario no existe");
        }
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  };

  useEffect(() => {
    initialData();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const segments = result.assets[0].uri.split("/");
      const imageName = segments[segments.length - 1];
      setImageName(imageName);

      uploadImage();
    }
  };

  // Subir
  async function uploadImage() {
    // Ruta de la imagen
    const storageRef = ref(storage, "imageProfile/" + imageName);

    const response = await fetch(image);
    const blob = await response.blob();

    try {
      // Subir una imagen JPG
      await uploadBytes(storageRef, blob, {
        contentType: "image/jpg",
      });
      // Subir una imagen PNG
      await uploadBytes(storageRef, blob, {
        contentType: "image/png",
      });

      console.log("El archivo se subió con éxito");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ImageBackground
      source={require('../assets/background_prof.jpg')}
      resizeMode="cover"
      style={styles.background}
    >
      <PaperProvider>
        {/* Dialog LogOut */}
        <View style={{ flexDirection: 'row-reverse' }} >
          <Button
            style={styles.btnLogOut}
            mode='text'
            onPress={showDialog}
          >
            <PaperText style={{ color: '#2fb6c3', fontSize: 15, fontWeight: '700' }} >
              Cerrar Sesión
            </PaperText>
          </Button>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog} style={{ height: 140 }} >
              <Dialog.Content>
                <PaperText variant="bodyLarge">¿Seguro que quiere salir?</PaperText>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Cancelar</Button>
                <Button onPress={logOut}>Salir</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>

        {/* Data */}
        <View style={styles.container}>
          <Text style={styles.txtHeader}>Bienvenido/a</Text>
          <View style={styles.containerProfile} >
            <TouchableOpacity style={styles.btnProfile} onPress={pickImage}>
              {!image && (
                <Image
                  source={{
                    uri: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
                  }}
                  style={styles.image}
                />
              )}
              {image && <Image source={{ uri: image }} style={styles.image} />}
            </TouchableOpacity>
          </View>
          <View style={styles.containerData}>
            <View style={styles.dataBanner}>
              <Text style={styles.txtData}>{nick.value}</Text>
            </View>
            <View style={styles.dataBanner}>
              <Text style={styles.txtData}>{email.value}</Text>
            </View>
            <View style={styles.dataBanner}>
              <Text style={styles.txtData}>{age.value}</Text>
            </View>
          </View>
        </View>
      </PaperProvider>
    </ImageBackground>
  )
}

const makeStyles = (colors: MD3Colors) =>
  StyleSheet.create({
    background: {
      flex: 1,
      width: '100%',
      backgroundColor: colors.surface
    },
    btnLogOut: {
      position: 'absolute',
      marginRight: 20,
      marginTop: 50,
    },
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    txtHeader: {
      textAlign: 'center',
      fontSize: 28,
      fontWeight: 'bold',
      color: '#2fb6c3',
    },
    containerProfile: {
      alignItems: 'center'
    },
    btnProfile: {
      borderRadius: 100,
      borderWidth: 2,
      borderColor: '#aaa',
      marginTop: 20,
      marginBottom: 20
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 100
    },
    containerData: {
      width: '100%',
      gap: 10
    },
    dataBanner: {
      marginLeft: 55,
      marginRight: 55,
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 30,
      paddingRight: 30,
      borderRadius: 15,
      backgroundColor: '#2fb6c340',
    },
    txtData: {
      color: '#ffff',
      fontSize: 17,
      fontWeight: '400'
    }
  })
