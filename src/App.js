import React from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from './screens/login/Login';

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    mainColor: '#FF8453',
    background: '#F3F2ED',
    backgroundSecondary: '#F8E0E4',
    card: '#F3F2ED',
    text: '#38424B',
    textDisabled: '#959A9C',
    border: '#38424B',
    placeholder: '#38424B',
    success: '#1CC88A',
    successIcon: '#13855C',
  },
};

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      
      <StatusBar barStyle = 'light-content' />
      <Stack.Navigator initialRouteName = "Login" screenOptions = {{ headerShown: false, headerLeft: null, animation: 'slide_from_right', contentStyle: { backgroundColor: '#476969' }}}>
        <Stack.Screen name = "Login" component = { Login } />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}


export default App;
