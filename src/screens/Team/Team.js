import  React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { CommonActions, useIsFocused } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Footer } from '../../components/Footer';

import { getMembers } from '../../services/Http';
import globalVariables from '../../services/GlobalVariables';


export function Team({ route, navigation }) {
    const { user } = route.params;
    const isFocused = useIsFocused();
    const [spinnerState, setSpinnerState] = useState(false);
    const [members, setMembers] = useState([]);

    const validationAlert = (title, message) => Alert.alert(title, message);

    useEffect(() => {
        if (isFocused) {
            globalVariables.currentVisitedScreen = 'Team';
            console.log(globalVariables.lastVisitedScreen, globalVariables.currentVisitedScreen);
            retrieveMembers();
        }
    }, [isFocused])

    function retrieveMembers() {
        setSpinnerState(true);
        getMembers()
        .then((res) => {
            setSpinnerState(false);
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].selected = false;
            }
            setMembers(res.data);
        })
        .catch((err) => {
            console.log(err);
            setSpinnerState(false);
            validationAlert('Atenção', err.error);
        });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style = {{ flexDirection: 'row', marginTop: 30, width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style = {{ flexDirection: 'row', alignItems: 'center', }} >
                    <TouchableOpacity onPress={ () => {
                        globalVariables.lastVisitedScreen = 'Team';
                        navigation.dispatch(CommonActions.goBack());
                    }}>
                        <Ionicons name = 'arrow-back' color = '#F2F2F2' size = { 35 }/>
                    </TouchableOpacity>
                    <Text style = {{ marginLeft: 10, fontWeight: 'bold', fontSize: 20, color: '#F2F2F2', }}>Equipe de Profissionais</Text>
                </View>
            </View>
            <View style = {{ marginTop: 20, width: '90%', alignSelf: 'center', }}>
                <Text style = {{ color: '#F2F2F2', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
                    Conheça o nosso time de profissionais que vão te proporcionar a melhor experiência odontológica possível!
                </Text>                
            </View>
            
            <ScrollView style = {{ marginTop: 15, width: '90%', alignSelf: 'center', }}>
                <View style = {{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', width: '100%'}}>
                    { members.map((member) => {   
                        return (
                            <TouchableOpacity 
                                key = { member.id } style = {{ marginTop: 20, width: 120, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', }}
                                onPress = { () => {
                                    navigation.navigate('TeamMember', { user: user, member: member })
                                }}
                            >
                                <Ionicons name = 'person-circle' size = { 96 } color = '#F2F2F2' />
                                <Text style= {{ marginTop: 5, color: '#F2F2F2', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>{ member.name }</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
            
            <Footer user = { user } disableProfileButton = { false } highlightHome = { false } highlightProfile = { false }/>
            { spinnerState == true ? 
                <Spinner visible={spinnerState} />
            : null }  
        </SafeAreaView>
    )
}