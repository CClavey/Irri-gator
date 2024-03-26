import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Index from './screens/index';
import SignUp from './screens/signup';
import Login from './screens/login';
import hubMenu from './screens/hubMenu';
import potMenu from './screens/potMenu';
import plantCatalogue from './screens/plantCatalogue';
import editPlant from './screens/editPlant';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="index" component={Index} />
        <Stack.Screen name="signup" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="PlantCatalogue" component={plantCatalogue} />
        <Stack.Screen name="editPlant" component={editPlant} />
        <Stack.Screen name="HubMenu" component={hubMenu} />
        <Stack.Screen name="PotMenu" component={potMenu} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;