import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ChatScreen from "./Chat";
import ChatHome from "./ChatHome";
import MembersPage from './MembersPage';
import History from './History';
import {Button} from 'react-native';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from "react-native";

const Stack = createStackNavigator();

const ChatNav = ({ navigation }) => {
  const [theme, setTheme] = useState("light");

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
          options={({ navigation, route }) => ({
            title: route.params.thread.restaurant,
            headerShadowVisible: false,
            headerLeft: () => (
              <View style={{ marginLeft: 10 }}>
                <Icon
                  name="chevron-left"
                  size={30}
                  color="#353535"
                  onPress={() => navigation.navigate("ChatHome")}
                />
              </View>
            ),
            headerRight: () => (
                <Button title="Members" dimension="60%" onPress={() => navigation.navigate("MembersPage", {thread: route.params.thread} )} />
            ),
          })}
        />
        <Stack.Screen name="MembersPage" component={MembersPage} options={{headerShown: false}}/>
        <Stack.Screen name="History" component={History} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ChatNav;
