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
        options={{
                  headerStyle: { backgroundColor: "#F4EEE0" },
                  headerShadowVisible: false,
                  headerLeft: () => (
                    <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                  ),
                  headerRight: () => (
                    <ScreenHeaderBtn iconUrl={images.profile} dimension="90%" />
                  ),
                  headerTitle: "Munch Hour",
                }}
        name='homeScreen' component={HomeScreen} />
        <Stack.Screen name = 'Settings' component = {Settings} options={{ headerShown: false}}/>
        <Stack.Screen name='notifSettings' component={NotifSettings} options={{headerShown: false}}/>
        <Stack.Screen name='Chat' component={ChatScreen}
        options={({ route }) => ({ title: route.params.thread.name })}
        />
        <Stack.Screen
                  name="AddPost"
                  component={AddPost}
                  options={({ navigation }) => ({
                    headerStyle: { backgroundColor: "#F4EEE0" },
                    headerShadowVisible: false,
                    headerLeft: () => (
                      <ScreenHeaderBtn
                        iconUrl={icons.left}
                        dimension="60%"
                        handlePress={() => navigation.navigate("homeScreen")}
                      />
                    ),
                    headerTitle: "Add Post",
                  })}
                />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
