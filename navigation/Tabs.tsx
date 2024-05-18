import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Movie from "../screens/Movie";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { Text, View, useColorScheme } from "react-native";
import {
  BLACK_COLOR,
  DARK_GREY,
  LIGHT_GREY,
  WHITE_COLOR,
  YELLOW_COLOR,
} from "../color";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function Tabs() {
  const isDark = useColorScheme() === "dark";
  console.log(isDark);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR,
        },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR,
        },
        headerTitleStyle: {
          color: isDark ? WHITE_COLOR : BLACK_COLOR,
        },
      }}
    >
      <Tab.Screen
        name="Movie"
        component={Movie}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons name="film-sharp" color={color} size={size}></Ionicons>
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="tv" color={color} size={size}></Ionicons>;
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons name="search" color={color} size={size}></Ionicons>
            );
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

export default Tabs;
