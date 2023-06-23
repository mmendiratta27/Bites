import React from 'react';
import ScreenHeaderBtn from "./src/headerInfo/ScreenHeaderBtn";
import { icons, images } from "./constants";
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/MaterialIcons";
import LoginScreen from './src/Auth/Login';
import RegisterScreen from './src/Auth/Register';
import HomeScreen from './src/home/homeScreen';
import Settings from './src/settings/settings';
import NotifSettings from './src/settings/notifSettings';
import ChatScreen from './src/messaging/Chat';
import ChatHome from './src/messaging/ChatHome';
import AddPost from "./src/create-posts/addPost";
import Home from './src/home/homeScreen';
import SettingsNav from './src/settings/settingsNav';
import ChatNav from './src/messaging/ChatNav'



// const Stack = createStackNavigator();
const homeName = 'Home'
const addpostName = "Add Post"
const settingsName = 'Settings'
const chatName ='GroupChats'
const achName = 'Acheivements'

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer independent ={true}>
      <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route}) => ({
        tabBarActiveTintColor: '#353535',
        tabBarStyle:{
          backgroundColor: '#F4EEE0'
          
        },
        tabBarIcon: ({ focused, color, size}) => {
          let iconName;
          let rn=route.name;

          if (rn===homeName){
            iconName =focused ? 'home': 'home-outline';
          }else if (rn===addpostName){
            iconName=focused ? 'add-circle': 'add-circle-outline';
            return <Icons name={iconName} size ={size} color ={'#353535'}/> 
          }
          else if (rn===settingsName){
            iconName = focused? 'cog': 'cog-outline';
          }
          else if (rn===chatName){
            iconName = focused? 'message-processing': 'message-processing-outline';
          }
          else if (rn===chatName){
            iconName = focused? 'message-processing': 'message-processing-outline';
          }
          else if (rn===achName){
            iconName = focused? 'crown': 'crown-outline';
          }

          return <Icon name={iconName} size ={size} color ={'#353535'}/>
        }
        
      })}>

        <Tab.Screen name ={homeName} component={HomeScreen} options={{
          animation: 'none',
          headerStyle: { backgroundColor: "#F4EEE0" },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="90%" />
          ),
          headerTitle: "Munch Hour",
        }}/>
        <Tab.Screen name ={achName} component={SettingsNav} options={{
          headerStyle: { backgroundColor: "#F4EEE0" },
          headerShadowVisible: false,
          headerTitle: "Acheivements",        
        }}
        />
        <Tab.Screen name={addpostName} component = {AddPost} options={{
          headerStyle: { backgroundColor: "#F4EEE0" },
          headerShadowVisible: false,
          headerTitle: "Add Post",
        }}/>
         <Tab.Screen name ={chatName} component={ChatNav} options={{
          headerStyle: { backgroundColor: "#F4EEE0" },
          headerShadowVisible: false,
          headerTitle: "Group Chats",
          headerShown: false,        
        }}
        />
        <Tab.Screen name ={settingsName} component={SettingsNav} options={{
          headerStyle: { backgroundColor: "#F4EEE0" },
          headerShadowVisible: false,
          headerTitle: "Settings",        
        }}
        />
       

      </Tab.Navigator>





      {/* <Stack.Navigator screenOptions={{ animation: false }}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
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
        <Stack.Screen name="ChatHome" component={ChatHome} />
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

      </Stack.Navigator> */}
    </NavigationContainer>
  );
};

export default App;
