import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import { useColorScheme } from "react-native";
import {
  BLACK_COLOR,
  DARK_GREY,
  LIGHT_GREY,
  WHITE_COLOR,
  YELLOW_COLOR,
} from "../color";

type RootStackParamList = {
  Detail: { data: IMovie };
};

const NativeStack = createNativeStackNavigator<RootStackParamList>();

const Stacks = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR,
        },
        headerTitleStyle: {
          color: isDark ? WHITE_COLOR : BLACK_COLOR,
        },
      }}
    >
      <NativeStack.Screen
        options={{ headerTitleAlign: "center" }}
        name="Detail"
        component={Detail}
      />
    </NativeStack.Navigator>
  );
};

export default Stacks;
