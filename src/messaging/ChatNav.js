import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import ChatScreen from './Chat';
import ChatHome from './ChatHome';


const Stack = createStackNavigator();


const ChatNav= () => {
    return (
      <NavigationContainer independent ={true}>
        <Stack.Navigator>
            <Stack.Screen name="ChatHome" component={ChatHome} options={{headerShown: false}}/>
            <Stack.Screen name='Chat' component={ChatScreen}
            options={({ route }) => ({ title: route.params.thread.name })}
            />
            
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default ChatNav;
  