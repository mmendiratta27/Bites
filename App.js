import React from "react";
import ScreenHeaderBtn from "./src/home/headerInfo/ScreenHeaderBtn";
import { icons, images } from "./constants";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/MaterialIcons";
import { View } from "react-native";

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
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerStyle: { backgroundColor: "#F4EEE0" },
            headerShadowVisible: false,
            headerTitle: "Login",
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
