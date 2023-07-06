import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from "react-native";

//Screens
import MainNavigator from "./src/MainNavigator";
import Login from "./src/Auth/Login";
import Register from "./src/Auth/Register";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

const App = () => {
  const [theme, setTheme] = useState("dark");

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerStyle: {
              backgroundColor: theme === "light" ? "#F4EEE0" : "#000",
            },
            headerShadowVisible: false,
            headerTitle: "Login",
            headerTitleStyle: {
              color: theme === "dark" ? "white" : "#353535",
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerStyle: { backgroundColor: "#F4EEE0" },
            headerShadowVisible: false,
            headerLeft: () => (
              <View style={{ marginLeft: 10 }}>
                <Icon name="chevron-left" size={30} color="#353535" />
              </View>
            ),
            headerTitle: "Create Account",
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
