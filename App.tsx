import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import Tabs from "./navigation/Tabs";
import { useColorScheme } from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";

export default function App() {
  const isDark = useColorScheme() === "dark";
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
