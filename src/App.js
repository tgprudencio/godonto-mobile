import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from './screens/login/Login';
import { Home } from './screens/Home/Home';
import { Appointment } from './screens/Appointment/Appointment';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle = 'light-content' />
      <Stack.Navigator initialRouteName = "Login" screenOptions = {{ headerShown: false, headerLeft: null, animation: 'slide_from_right', contentStyle: { backgroundColor: '#476969' }}}>
        <Stack.Screen name = 'Login' component = { Login } />
        <Stack.Screen name = 'Home' component = { Home } />
        <Stack.Screen name = 'Appointment' component = { Appointment } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
