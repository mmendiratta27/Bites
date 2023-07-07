import React, { useState } from "react";
import ScreenHeaderBtn from "./src/home/headerInfo/ScreenHeaderBtn";
import { icons, images } from "./constants";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/MaterialIcons";
import { View, Appearance } from "react-native";

//Screens
import MainNavigator from "./src/MainNavigator";
import Login from "./src/Auth/Login";
import Register from "./src/Auth/Register";
import { createStackNavigator } from "@react-navigation/stack";

const homeName = "Home";
const addpostName = "Add Post";
const settingsName = "Settings";
const chatName = "GroupChats";
const achName = "Acheivements";

const Stack = createStackNavigator();

const App = () => {
  const [theme, setTheme] = useState("light");

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerStyle: {
              backgroundColor: theme === "light" ? "#F4EEE0" : "#353535",
            },
            headerShadowVisible: false,
            headerTitle: "Login",
            headerTitleStyle: {
              color: theme === "dark" ? "#F4EEE0" : "#353535",
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerStyle: {
              backgroundColor: theme === "light" ? "#F4EEE0" : "#353535",
            },
            headerShadowVisible: false,
            headerTitle: "Create Account",
            headerTitleStyle: {
              color: theme === "dark" ? "#F4EEE0" : "#353535",
            },
            headerTintColor: "#353535",
          }}
        />
        <Stack.Screen
          name="MainNavigator"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
