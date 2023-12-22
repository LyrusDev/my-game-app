import React from "react";

// Navegador
import "react-native-gesture-handler";
import MainNavigator from "./browser/MainNavigator";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <MainNavigator />
    </PaperProvider>)
}
