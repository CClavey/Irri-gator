import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Index from './screens/index';
import SignUp from './screens/signup';
import Login from './screens/login';
import HubMenu from './screens/hubMenu';
import PotMenu from './screens/potMenu';
import AddPlant from './screens/addPlant';
import EditPlant from './screens/editPlant';
import AddHub from './screens/addHub';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name=" " component={Index} options={{ headerLeft: null, headerStyle:{backgroundColor: '#65BEE3'}}}/>
        <Stack.Screen name="Signup" component={SignUp} options={{ headerLeft: null, headerStyle:{backgroundColor: '#65BEE3'}}}/>
        <Stack.Screen name="Login" component={Login} options={{ headerLeft: null, headerStyle:{backgroundColor: '#65BEE3'}}}/>
        <Stack.Screen name="HubMenu" component={HubMenu} options={{ headerLeft: null, headerStyle:{backgroundColor: '#65BEE3'}}}/>
        <Stack.Screen name="PotMenu" component={PotMenu} options={{headerStyle:{backgroundColor: '#65BEE3'}}}/>
        <Stack.Screen name="AddPlant" component={AddPlant} options={{headerStyle:{backgroundColor: '#65BEE3'}}}/>
        <Stack.Screen name="EditPlant" component={EditPlant} options={{headerStyle:{backgroundColor: '#65BEE3'}}}/>
        <Stack.Screen name="AddHub" component={AddHub} options={{headerStyle:{backgroundColor: '#65BEE3'}}}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;