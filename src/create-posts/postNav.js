import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import AddPost from "./addPost"
import TimePicker from "./timePicker"

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import { Time } from "react-native-gifted-chat";

const Stack = createStackNavigator();

const PostNav = ({ navigation }) => {
  const [theme, setTheme] = useState("light");

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="AddPost"
          component={AddPost}
          options={{
            headerStyle: {
              backgroundColor: theme === "light" ? "#F4EEE0" : "#353535",
            },
            headerShadowVisible: false,
            headerTitle: "AddPost",
            headerTitleStyle: {
              color: theme === "dark" ? "#F4EEE0" : "#353535",
            },
          }}
        />
        <Stack.Screen
          name="TimePicker"
          component={TimePicker}
          options={{
            headerStyle: {
              backgroundColor: theme === "light" ? "#F4EEE0" : "#353535",
            },
            headerShadowVisible: false,
            headerTitle: "Group Chats",
            headerTitleStyle: {
              color: theme === "dark" ? "#F4EEE0" : "#353535",
            },
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PostNav;
