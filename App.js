import React from 'react';
import ScreenHeaderBtn from "./src/headerInfo/ScreenHeaderBtn";
import { icons, images } from "./constants";
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/home/homeScreen';
import FeedScreen from './src/feed/Feed';
import WelcomeScreen from './src/headerInfo/welcome/Welcome';
import Settings from './src/settings/settings';
import NotifSettings from './src/settings/notifSettings';
import Profile from './src/settings/profile';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = 'Settings' component = {Settings} options={{ headerShown: false}}/>
        <Stack.Screen name='notifSettings' component={NotifSettings} options={{headerShown: false}}/>
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
        <Stack.Screen name='Feed' component={FeedScreen} />
        <Stack.Screen name='Welcome' component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;