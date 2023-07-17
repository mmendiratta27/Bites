import { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from "react-native";
import ScreenHeaderBtn from "./home/headerInfo/ScreenHeaderBtn";
import { icons, images } from "../constants";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/MaterialIcons";
import { BottomPopup } from "./post-details/BottomPopup";
import styles from "./feed/FeedPost.style";
import { auth, db, firebase } from "./../firebase";

//Screens
import HomeScreen from "./home/homeScreen";
import AddPost from "./create-posts/addPost";
import SettingsNav from "./settings/settingsNav";
import ChatNav from "./messaging/ChatNav";
import Login from "./Auth/Login";
import Achievement from "./Achievements/Achievement";

const homeName = "Home";
const addpostName = "Add Post";
const settingsName = "Settings";
const chatName = "GroupChats";
const achName = "Achievements";

const image = {
  uri: "https://images.prismic.io/raisingcanes/93a74859-268e-46ce-aa54-653a804c82cd_raising-canes-web-logo_0825_square.png?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&rect=0%2C0%2C1000%2C1000&w=256&h=256",
};

const Tab = createBottomTabNavigator();

const MainNavigator = ({ dimension, navigation }) => {
  const SignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(navigation.replace("Login"))
      .catch((error) => {
        console.log("Error", error.toString());
      });
  };

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
            headerStyle: {
              backgroundColor: "#F4EEE0",
            },
            headerShadowVisible: false,
            headerLeft: () => (
              // <Button title="Logout" onPress={SignOut} />
              <Icon.Button
                name="logout"
                backgroundColor="transparent"
                onPress={SignOut}
                color="#353535"
                style={{ transform: [{ scaleX: -1 }] }}
                size={25}
                underlayColor="transparent"
              />
            ),
            headerRight: () => (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate("EditProfile")}
                  resizeMode="contain"
                >
                  <View style={[styles.logoContainer, { marginRight: 10 }]}>
                    <Image
                      source={{
                        uri: auth?.currentUser?.photoURL,
                      }}
                      // resizeMode="contain"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 9.6,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </>
            ),
            headerTitle: "Bites!",
          }}
        />
        <Tab.Screen
          name={achName}
          component={Achievement}
          options={{
            headerStyle: { backgroundColor: "#F4EEE0" },
            headerShadowVisible: false,
            headerTitle: "Achievements",
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
