import  React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Footer } from '../../components/Footer';
import { useIsFocused } from '@react-navigation/native';
import globalVariables from '../../services/GlobalVariables';

export function Home({ route, navigation }) {
    const isFocused = useIsFocused();
    const { user } = route.params;
    const [greetingText, setGreetingText] = useState('');
    const date = new Date();

    const validationAlert = (title, message) => Alert.alert(title, message);

    useEffect(() => {
        console.log(user);
        setGreeting(date.getHours());
    }, []);

    useEffect(() => {
        if (isFocused) {
            globalVariables.currentVisitedScreen = 'Home';
            console.log(globalVariables.lastVisitedScreen, globalVariables.currentVisitedScreen);    
        }
        
    }, [isFocused]);
    
    function setGreeting(date) {
        if (date >= 6 && date <= 12) {
          setGreetingText('Bom dia,');
        } else if (date >= 13 && date <= 17) {
          setGreetingText('Boa tarde,');
        } else {
          setGreetingText('Boa noite,');
        }
      }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style = {{ width: '90%', alignSelf: 'center' }}>
                <View style = {{ marginTop: 30, }}>
                    <Text style = {{ color: '#F2F2F2', }}>{ greetingText }</Text>
                    <Text style = {{ fontWeight: 'bold', fontSize: 16, color: '#F2F2F2', }}>{ user.name }</Text>
                </View>
                <View style = {{ marginTop: 20, }}>
                    <Text style = {{ fontWeight: 'bold', fontSize: 20, color: '#F2F2F2', }}>O que gostaria de fazer hoje?</Text>
                </View>
            </View>
            <ScrollView style = {{ width: '90%', alignSelf: 'center' }}>
                <View style = {{ marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', width: '100%'}}>
                    <TouchableOpacity 
                        style = {{ marginVertical: 10, width: 140, height: 140, borderRadius: 20, borderWidth: 3, borderColor: '#F2F2F2', alignItems: 'center', justifyContent: 'center', backgroundColor: '#2B5353' }}
                        onPress={ () => {
                            globalVariables.lastVisitedScreen = 'Home';
                            navigation.navigate('Appointment', { user: user });
                        }}
                    >
                        <Ionicons name="calendar" style = {{ color: '#F2F2F2', fontSize: 30, fontSize: 64 }}></Ionicons>
                        <Text style = {{ marginTop: 5, padding: 5, textAlign: 'center', color: '#F2F2F2', fontWeight: 'bold', fontSize: 15 }}>Agendamento de Consultas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = {{ marginVertical: 10, width: 140, height: 140, borderRadius: 20, borderWidth: 3, borderColor: '#F2F2F2', alignItems: 'center', justifyContent: 'center', backgroundColor: '#2B5353' }}
                        onPress={ () => validationAlert('Atenção', 'Módulo em desenvolvimento') }
                    >
                        <Ionicons name="list" style = {{ color: '#F2F2F2', fontSize: 30, fontSize: 64 }}></Ionicons>
                        <Text style = {{ marginTop: 5, padding: 5, textAlign: 'center', color: '#F2F2F2', fontWeight: 'bold', fontSize: 15 }}>Histórico de Consultas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = {{ marginVertical: 10, width: 140, height: 140, borderRadius: 20, borderWidth: 3, borderColor: '#F2F2F2', alignItems: 'center', justifyContent: 'center', backgroundColor: '#2B5353' }}
                        onPress={ () => validationAlert('Atenção', 'Módulo em desenvolvimento') }
                    >
                        <Ionicons name="medical" style = {{ color: '#F2F2F2', fontSize: 30, fontSize: 64 }}></Ionicons>
                        <Text style = {{ marginTop: 5, padding: 5, textAlign: 'center', color: '#F2F2F2', fontWeight: 'bold', fontSize: 15 }}>Equipe de Profissionais</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            
            <Footer user = { user } disableProfileButton = { true }/>
        </SafeAreaView>
    )
}