import { Alert, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// Librerias
import { Button as PaperButton, Dialog, Portal, PaperProvider, Text as PaperText, useTheme } from 'react-native-paper'
import { MD3Colors } from 'react-native-paper/lib/typescript/types'
// Image Picker
import * as ImagePicker from "expo-image-picker";
// AUTH
import { signOut } from "firebase/auth";
// STORAGE
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// DATABASE
import { ref as refDatabase, get, update } from "firebase/database";
// HELPERS
import { storage, auth, db } from '../helpers/ConfigDB';
import { TextInput, Button } from '../components';
// VALIDADORES 
import { emailValidator } from "../helpers/emailValidator";
import { nickValidator } from "../helpers/nickValidator";
import { ageValidator } from "../helpers/ageValidator";

export default function ProfileScreen({ navigation }: any) {
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [imageProfile, setImageProfile] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [nick, setNick] = useState({ value: "", error: "" });
  const [age, setAge] = useState({ value: "", error: "" });

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
          setImageProfile({ value: snapshot.val().imageProfile, error: "" })
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

      const imageURL = await getDownloadURL(storageRef);

      const userUID = auth.currentUser?.uid;
      // Additional Data
      update(refDatabase(db, 'users/' + userUID), {
        imageProfile: imageURL
      })

      setImageProfile({ value: imageURL, error: "" });

      console.log("El archivo se subió con éxito");
    } catch (error) {
      console.log(error);
    }
  }

  function uploadData() {
    const userUID = auth.currentUser?.uid;
    // Additional Data
    update(refDatabase(db, 'users/' + userUID), {
      nick: nick.value,
      age: age.value
    })
  }

  function onUploadPressed() {
    const emailError = emailValidator(email.value);
    const nickError = nickValidator(nick.value);
    const ageError = ageValidator(age.value);
    if (emailError || nickError || ageError) {
      setEmail({ ...email, error: emailError });
      setNick({ ...nick, error: nickError });
      setAge({ ...age, error: ageError });
      return;
    }
    uploadData();
  };

  return (
    <ImageBackground
      source={require('../assets/background_prof.jpg')}
      resizeMode="cover"
      style={styles.background}
    >
      <PaperProvider>
        {/* Dialog LogOut */}
        <View style={{ flexDirection: 'row-reverse' }} >
          <PaperButton
            style={styles.btnLogOut}
            mode='text'
            onPress={showDialog}
          >
            <PaperText style={{ color: '#2fb6c3', fontSize: 15, fontWeight: '700' }} >
              Cerrar Sesión
            </PaperText>
          </PaperButton>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog} style={{ height: 140 }} >
              <Dialog.Content>
                <PaperText variant="bodyLarge">¿Seguro que quiere salir?</PaperText>
              </Dialog.Content>
              <Dialog.Actions>
                <PaperButton onPress={hideDialog}>Cancelar</PaperButton>
                <PaperButton onPress={logOut}>Salir</PaperButton>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>

        {/* Data */}
        <View style={styles.container}>
          <Text style={styles.txtHeader}>Bienvenido/a</Text>
          <View style={styles.containerProfile} >
            <TouchableOpacity style={styles.btnProfile} onPress={pickImage}>
              {!imageProfile.value && (
                <Image
                  source={{
                    uri: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
                  }}
                  style={styles.image}
                />
              )}
              {imageProfile.value && <Image source={{ uri: imageProfile.value }} style={styles.image} />}
            </TouchableOpacity>
          </View>
          <View style={styles.containerData}>
            <TextInput
              returnKeyType="next"
              value={email.value}
              onChangeText={(text: string) => setEmail({ value: text, error: "" })}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              // editable={false}
              disabled={true}
            />
            <TextInput
              label="Nick"
              returnKeyType="next"
              value={nick.value}
              onChangeText={(text: string) => setNick({ value: text, error: "" })}
              error={!!nick.error}
              errorText={nick.error}
              style={{ paddingTop: 10 }}
            />
            <TextInput
              label="Edad"
              returnKeyType="next"
              value={age.value}
              onChangeText={(text: string) => setAge({ value: text, error: "" })}
              error={!!age.error}
              errorText={age.error}
              style={{ paddingTop: 10 }}
            />
            <Button mode="outlined" onPress={onUploadPressed} style={{ marginTop: 10 }}>
              Actualizar
            </Button>
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
      width: '100%'
    },
    btnLogOut: {
      position: 'absolute',
      marginRight: 20,
      marginTop: 50,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
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
      marginTop: 10,
      marginBottom: 10
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 100
    },
    containerData: {
      paddingHorizontal: 20,
      width: '100%',
      maxWidth: 340,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
