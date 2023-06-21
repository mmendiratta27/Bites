import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { icons, images } from "./constants";
import ScreenHeaderBtn from "./src/headerInfo/ScreenHeaderBtn";
import HomeScreen from "./src/home/homeScreen";
import FeedScreen from "./src/feed/Feed";
import WelcomeScreen from "./src/headerInfo/welcome/Welcome";
import AddPost from "./src/create-posts/addPost";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerStyle: { backgroundColor: "#F4EEE0" },
            headerShadowVisible: false,
            headerRight: () => (
              <ScreenHeaderBtn
                iconUrl={images.profile}
                dimension="90%"
                // handlePress={() => navigation.navigate("Profile")}
              />
            ),
            headerTitle: "Munch Hour",
          }}
        />
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
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
                handlePress={() => navigation.navigate("HomeScreen")}
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
