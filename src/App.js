import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from './screens/login/Login';
import { Home } from './screens/Home/Home';
import { Appointment } from './screens/Appointment/Appointment';
import { AppointmentNew } from './screens/AppointmentNew/AppointmentNew';
import { AppointmentEdit } from './screens/AppointmentEdit/AppointmentEdit';
import { History } from './screens/History/History';
import { Team } from './screens/Team/Team';
import { TeamMember } from './screens/TeamMember/TeamMember';
import { Profile } from './screens/Profile/Profile';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle = 'light-content' />
      <Stack.Navigator initialRouteName = "Login" screenOptions = {{ headerShown: false, headerLeft: null, animation: 'slide_from_right', contentStyle: { backgroundColor: '#476969' }}}>
        <Stack.Screen name = 'Login' component = { Login } />
        <Stack.Screen name = 'Home' component = { Home } />
        <Stack.Screen name = 'Profile' component = { Profile } />
        <Stack.Screen name = 'Team' component = { Team } />
        <Stack.Screen name = 'TeamMember' component = { TeamMember } />
        <Stack.Screen name = 'History' component = { History } />
        <Stack.Screen name = 'Appointment' component = { Appointment } />
        <Stack.Screen name = 'AppointmentNew' component = { AppointmentNew } />
        <Stack.Screen name = 'AppointmentEdit' component = { AppointmentEdit } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
