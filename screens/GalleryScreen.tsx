import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Alert, Image, Platform } from "react-native";
import { signOut } from "firebase/auth";
import { auth, storage } from "../helpers/ConfigDB";
import * as ImagePicker from 'expo-image-picker';
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage";

export default function GalleryScreen({ navigation }: any) {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const email = auth.currentUser.email

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const segments = result.assets[0].uri.split('/');
      const imageName = segments[segments.length - 1];
      setImageName(imageName)
    }
  };
  

  const upload = async () => {
    const storageRef = ref(storage, `test/${imageName}`);

    const response = await fetch(image);
    const blob = await response.blob();

    try {
      await uploadBytes(storageRef, blob, {
        contentType : 'image/jpg'
      });
      console.log('La imagen se sugbio con exito')

      const imageURL = await getDownloadURL(storageRef)
      console.log('URL de descarga de la image', imageURL)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Selecciona una imagen de la galería" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Subir Imagen" onPress={upload} />
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
