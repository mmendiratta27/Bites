import React from 'react';
import ScreenHeaderBtn from "./home/headerInfo/ScreenHeaderBtn";
import { icons, images } from "../constants";
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/MaterialIcons";
import { View } from 'react-native';

//Screens
import HomeScreen from './home/homeScreen';
import AddPost from "./create-posts/addPost";
import SettingsNav from './settings/settingsNav';
import ChatNav from './messaging/ChatNav'
import Login from './Auth/Login';

const homeName = 'Home'
const addpostName = "Add Post"
const settingsName = 'Settings'
const chatName ='GroupChats'
const achName = 'Acheivements'


const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#353535",
          tabBarStyle: {
            backgroundColor: "#F4EEE0",
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === addpostName) {
              iconName = focused ? "add-circle" : "add-circle-outline";
              return <Icons name={iconName} size={size} color={"#353535"} />;
            } else if (rn === settingsName) {
              iconName = focused ? "cog" : "cog-outline";
            } else if (rn === chatName) {
              iconName = focused
                ? "message-processing"
                : "message-processing-outline";
            } else if (rn === achName) {
              iconName = focused ? "crown" : "crown-outline";
            }

            return <Icon name={iconName} size={size} color={"#353535"} />;
          },
        })}
      >
        <Tab.Screen
          name={homeName}
          component={HomeScreen}
          options={{
            animation: "none",
            headerStyle: { backgroundColor: "#F4EEE0" },
            headerShadowVisible: false,
            headerLeft: () => (
              <View style={{ marginLeft: 10 }}>
                <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
              </View>
            ),
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                <ScreenHeaderBtn iconUrl={images.profile} dimension="90%" />
              </View>
            ),
            headerTitle: "GroupBites",
          }}
        />
        <Tab.Screen
          name={achName}
          component={SettingsNav}
          options={{
            headerStyle: { backgroundColor: "#F4EEE0" },
            headerShadowVisible: false,
            headerTitle: "Acheivements",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={addpostName}
          component={AddPost}
          options={{
            headerStyle: { backgroundColor: "#F4EEE0" },
            headerShadowVisible: false,
            headerTitle: "Add Post",
          }}
        />
        <Tab.Screen
          name={chatName}
          component={ChatNav}
          options={{
            headerStyle: { backgroundColor: "#F4EEE0" },
            headerShadowVisible: false,
            headerTitle: "Group Chats",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={settingsName}
          component={SettingsNav}
          options={{
            headerStyle: { backgroundColor: "#F4EEE0" },
            headerShadowVisible: false,
            headerTitle: "Settings",
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
