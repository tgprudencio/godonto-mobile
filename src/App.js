import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style = {{ backgroundColor: '#476969', flex: 1 }}>
        <StatusBar barStyle='light-content' />
        
      </SafeAreaView>
    </NavigationContainer>
  );
}


export default App;
