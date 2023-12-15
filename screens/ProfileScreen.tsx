import { Alert, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// Librerias
import { Button, useTheme } from 'react-native-paper'
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
  const [password, setPassword] = useState({ value: "", error: "" });

  const { colors } = useTheme()
  const styles = makeStyles(colors)

  const logOut = () => {
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

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   // console.log(result);

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //     console.log(result);
  //   }
  // };

  // Subir
  // async function uploadImage() {
  //   pickImage();
  //   // Ruta de la imagen
  //   const storageRef = ref(storage, "profile/profile1");

  //   const response = await fetch(image);
  //   const blob = await response.blob();

  //   try {
  //     // Subir una imagen JPG
  //     await uploadBytes(storageRef, blob, {
  //       contentType: "image/jpg",
  //     });
  //     // Subir una imagen PNG
  //     await uploadBytes(storageRef, blob, {
  //       contentType: "image/png",
  //     });

  //     console.log("El archivo se subió con éxito");

  //     // Obtiene la URL de la imagen
  //     const imageURL = await getDownloadURL(storageRef);
  //     // console.log("URL de la imagen: ", imageURL);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background_prof.jpg')}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={{ flexDirection: 'row-reverse' }}>
        <Button
          mode='text'
          textColor='#fff'
          onPress={() => logOut()}
          style={styles.btnLogOut}
        >
          Cerrar Sesión
        </Button>
      </View>
      <View style={styles.container}>
        <Text style={styles.txtHeader}>Bienvenido/a</Text>

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

        <Text style={styles.txtData}>{nick.value}</Text>
        <Text style={styles.txtData}>{email.value}</Text>
        <Text style={styles.txtData}>{age.value}</Text>
      </View>
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
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    btnLogOut: {
      position: 'absolute',
      marginRight: 30,
      marginTop: 50,
    },
    txtHeader: {
      textAlign: 'center',
      fontSize: 26,
      color: '#fff',
    },
    btnProfile: {
      borderRadius: 100,
      borderWidth: 2,
      borderColor: '#fff',
      marginTop: 20,
      marginBottom: 20
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 100
    },
    txtData: {
      color: '#fff'
    }
  })
