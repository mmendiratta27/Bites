import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Settings from './settings';
import NotifSettings from './notifSettings';

const Stack = createStackNavigator();


const SettingsNav= () => {
    return (
      <NavigationContainer independent ={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="notifSettings" component={NotifSettings} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default SettingsNav;
  