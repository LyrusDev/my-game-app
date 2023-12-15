import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
  apiKey: "AIzaSyBsDr7ikuaVGQCLkDjndVr4T3VP3ZEQgZ4",
  authDomain: "evaluacion-163de.firebaseapp.com",
  databaseURL: "https://evaluacion-163de-default-rtdb.firebaseio.com",
  projectId: "evaluacion-163de",
  storageBucket: "evaluacion-163de.appspot.com",
  messagingSenderId: "1072894538710",
  appId: "1:1072894538710:web:29838e25eea7d71a8d2a77"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getDatabase(app)
export const storage = getStorage(app);