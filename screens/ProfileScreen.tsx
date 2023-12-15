import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  Background,
  Logo,
  Header,
  Button,
  TextInput,
  BackButton,
} from "../components";
import { auth, storage, db } from "../helpers/ConfigDB";
import * as ImagePicker from "expo-image-picker";
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage";
import { onValue, ref as refDatabase, get } from "firebase/database";

export default function ProfileScreen({ navigation }: any) {
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [profile, setProfile] = useState<string | null>(null);
  const [email, setEmail] = useState({ value: "", error: "" });
  const [nick, setNick] = useState({ value: "", error: "" });
  const [age, setAge] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

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

  useEffect(() => {
    initialData();
  }, []);

  return (
    <Background>
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {!image && (
          <Image
            source={{
              uri: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
            }}
            style={styles.profileImage}
          />
        )}
        {image && <Image source={{ uri: image }} style={styles.profileImage} />}
      </TouchableOpacity>
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
        label="Nick"
        returnKeyType="next"
        value={nick.value}
        onChangeText={(text: string) => setNick({ value: text, error: "" })}
        error={!!nick.error}
        errorText={nick.error}
      />
      <TextInput
        label="Edad"
        returnKeyType="next"
        value={age.value}
        onChangeText={(text: string) => setAge({ value: text, error: "" })}
        error={!!age.error}
        errorText={age.error}
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
      <Button mode="outlined" onPress={() => {}} style={{ marginTop: 24 }}>
        Actualizar
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignSelf: "center",
  },
  profileImage: {
    borderRadius: 100,
    width: 120,
    height: 120,
  },
});
