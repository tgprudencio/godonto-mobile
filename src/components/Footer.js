import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View  } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function Footer() {
    const navigation = useNavigation();
    const [pressedButton, setPressedButton] = useState('home');

    useEffect(() => {
        if (pressedButton == 'home') {
            console.log('ir para home');
        }
        else {
            console.log('ir para perfil');
        }
    }, [pressedButton])

    return (
        <View style = {{
            flexDirection:'row',
            height: 60,
            width:'100%',
            maxWidth: 800,
            position: 'fixed',
            bottom: 0,
            backgroundColor: '#2B5353'
        }}>
            <TouchableOpacity 
                style = {{ color: '#F2F2F2', fontSize: 30, width: '50%', alignItems: 'center', justifyContent: 'center' }}
                onPress={ () => setPressedButton('home')}
                >
                <Ionicons name = 'home' size = { 30 } color = { pressedButton == 'home' ? '#FF4500' : '#F2F2F2'} />
            </TouchableOpacity>
            <TouchableOpacity 
                style = {{ color: '#F2F2F2', fontSize: 30, width: '50%', alignItems: 'center', justifyContent: 'center' }}
                onPress={ () => setPressedButton('profile')}
            >
                <Ionicons name = 'person' size = { 30 } color = { pressedButton == 'profile' ? '#FF4500' : '#F2F2F2'} />
            </TouchableOpacity>
        </View>
    );
}