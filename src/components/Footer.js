import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import globalVariables from '../services/GlobalVariables';

export function Footer(props) {
    const navigation = useNavigation();

    return (
        <View style = {{
            flexDirection:'row',
            height: 60,
            width:'100%',
            maxWidth: 800,
            position: 'fixed',
            bottom: 0,
        }}>
            <TouchableOpacity 
                style = {{ backgroundColor: '#2B5353', color: '#F2F2F2', fontSize: 30, width: '50%', alignItems: 'center', justifyContent: 'center' }}
                onPress={ () => {
                    globalVariables.lastVisitedScreen = globalVariables.currentVisitedScreen;
                    navigation.navigate('Home', { user: props.user });
                }}
                >
                <Ionicons name = 'home' size = { 30 } color = { props.highlightHome ? '#FF4500' : '#F2F2F2'} />
            </TouchableOpacity>
            <TouchableOpacity 
                disabled = { props.disableProfileButton }
                style = {{ backgroundColor: '#2B5353', color: '#F2F2F2', fontSize: 30, width: '50%', alignItems: 'center', justifyContent: 'center', opacity: props.disableProfileButton ? 0.3 : 1 }}
                onPress={ () => {
                    globalVariables.lastVisitedScreen = globalVariables.currentVisitedScreen;
                    navigation.navigate('Profile', { user: props.user });
                }}
            >
                <Ionicons name = 'person' size = { 30 } color = { props.highlightProfile ? '#FF4500' : '#F2F2F2'} />
            </TouchableOpacity>
        </View>
    );
}