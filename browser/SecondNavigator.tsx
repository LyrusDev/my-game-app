import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "../screens/HomeScreen";
import GalleryScreen from '../screens/GalleryScreen';

const Drawer = createDrawerNavigator();

export default function SecondNavigator() {
  return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Gallery" component={GalleryScreen} />
      </Drawer.Navigator>
  );
}