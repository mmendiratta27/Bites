import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Title, IconButton } from 'react-native-paper'
import ScreenHeaderBtn from "./src/headerInfo/ScreenHeaderBtn";
import { COLORS, icons, images, SIZES } from "./constants";
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/Auth/Login';
import RegisterScreen from './src/Auth/Register';
import HomeScreen from './src/home/homeScreen';
import FeedScreen from './src/feed/Feed';
import WelcomeScreen from './src/headerInfo/welcome/Welcome';
import ChatScreen from './src/messaging/Chat';
import ChatHome from './src/messaging/ChatHome';
import addChat from './src/messaging/addChat';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator >
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen
        options={{
                  headerStyle: { backgroundColor: "#F4EEE0" },
                  presentation: "modal",
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
        <Stack.Screen name='Feed' component={FeedScreen} />
        <Stack.Screen name='Welcome' component={WelcomeScreen} />
        <Stack.Screen name='Chat' component={ChatScreen}
        options={({ route }) => ({ title: route.params.thread.name })}
        />
        <Stack.Screen name='ChatHome' component={ChatHome} />
        <Stack.Screen name='addChat' component={addChat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;