import  React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';


export function Home({ route, navigation }) {

    const { user } = route.params;
    useEffect(() => {
        console.log(user);
    })

    const validationAlert = (title, message) => Alert.alert(title, message);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style = {{ width: '90%' }}>
                <View style = {{ marginTop: 30 }}>
                    <Text>Bom dia,</Text>
                    <Text>{ user.name }</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}