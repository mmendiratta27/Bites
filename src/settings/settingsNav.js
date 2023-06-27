import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Settings from './settings';
import NotifSettings from './notifSettings';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from 'react-native';

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
              headerLeft: () => (
                <View style={{ marginLeft: 10 }}>
                  <Icon
                    name="chevron-left"
                    size={30}
                    color="#353535"
                    onPress={() => navigation.navigate("Settings")}
                  />
                </View>
              ),
              headerTitle: "Notifications",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default SettingsNav;
  