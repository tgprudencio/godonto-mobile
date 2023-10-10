import  React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';


export function Home({ route, navigation }) {

    const validationAlert = (title, message) => Alert.alert(title, message);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#2B5353', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
            </View>
        </SafeAreaView>
    )
}