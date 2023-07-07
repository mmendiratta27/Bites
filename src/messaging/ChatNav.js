import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ChatScreen from "./Chat";
import ChatHome from "./ChatHome";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from "react-native";

const Stack = createStackNavigator();

const ChatNav = ({ navigation }) => {
  const [theme, setTheme] = useState("dark");

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="ChatHome"
          component={ChatHome}
          options={{
            headerStyle: {
              backgroundColor: theme === "light" ? "#F4EEE0" : "#353535",
            },
            headerShadowVisible: false,
            headerTitle: "Group Chats",
            headerTitleStyle: {
              color: theme === "dark" ? "#F4EEE0" : "#353535",
            },
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={({ route }) => ({
            title: route.params.thread.name,
            headerShadowVisible: false,
            headerTitle: "TestChat1",
            headerLeft: () => (
              <View style={{ marginLeft: 10 }}>
                <Icon
                  name="chevron-left"
                  size={30}
                  color="#353535"
                  onPress={() => navigation.navigate("GroupChats")}
                />
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ChatNav;
