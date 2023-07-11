import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Settings from './settings';
import NotifSettings from './notifSettings';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EditProfile from './editProfile';
import { View } from 'react-native';
import Profile from './profile';

const Stack = createStackNavigator();


const SettingsNav= ({navigation}) => {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              headerStyle: { backgroundColor: "#F4EEE0" },
              headerShadowVisible: false,
              headerTitle: "Settings",
            }}
          />
          <Stack.Screen
            name="notifSettings"
            component={NotifSettings}
            options={{
              headerStyle: { backgroundColor: "#F4EEE0" },
              headerShadowVisible: false,
              headerTintColor: "#353535",
              headerTitle: "Notifications",
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerStyle: {
                backgroundColor: "#F4EEE0",
              },
              headerShadowVisible: false,
              headerTitle: "Create Account",
              headerTitleStyle: {
                color: "#F4EEE0",
              },
              headerTintColor: "#353535",
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerStyle: {
                backgroundColor: "#F4EEE0",
              },
              headerShadowVisible: false,
              headerTitle: "Create Account",
              headerTitleStyle: {
                color: "#F4EEE0",
              },
              headerTintColor: "#353535",
              presentation: "modal",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default SettingsNav;
  