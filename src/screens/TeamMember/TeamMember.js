import  React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { CommonActions, useIsFocused } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Footer } from '../../components/Footer';

import { getMemberAppointments } from '../../services/Http';
import globalVariables from '../../services/GlobalVariables';


export function TeamMember({ route, navigation }) {
    const { user, member } = route.params;
    const isFocused = useIsFocused();
    const [spinnerState, setSpinnerState] = useState(false);
    const [numberOfAppointments, setNumberOfAppointments] = useState([]);
    const [experienceText, setExperienceText] = useState('');

    useEffect(() => {
        if (isFocused) {
            globalVariables.currentVisitedScreen = 'TeamMember';
            console.log(globalVariables.lastVisitedScreen, globalVariables.currentVisitedScreen);
            loadMemberInfo(member.id);
        }
    }, [isFocused]);

    function loadMemberInfo(memberId) {
        setSpinnerState(true);
        var professionStartYear = new Date().getFullYear() - new Date(member.professionStartAt).getFullYear();        
        
        getMemberAppointments(memberId)
        .then((res) => {
            setSpinnerState(false);
            setNumberOfAppointments(res.data.length);
            if (professionStartYear > 0) {
                setExperienceText(professionStartYear + ' anos');
            } else {
                setExperienceText('< 1 ano');
            }
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
                        globalVariables.lastVisitedScreen = 'TeamMember';
                        navigation.dispatch(CommonActions.goBack());
                    }}>
                        <Ionicons name = 'arrow-back' color = '#F2F2F2' size = { 35 }/>
                    </TouchableOpacity>
                    <Text style = {{ marginLeft: 10, fontWeight: 'bold', fontSize: 20, color: '#F2F2F2', }}>{ member.name }</Text>
                </View>
            </View>
            
            <ScrollView style = {{ marginTop: 15, width: '90%', alignSelf: 'center', }}>
                <View style = {{ justifyContent: 'space-evenly', width: '100%'}}>
                    <View style = {{ marginTop: 20, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', }}>
                        <Ionicons name = 'person-circle' size = { 150 } color = '#F2F2F2' />
                        <Text style= {{ marginTop: 5, color: '#F2F2F2', fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>{ member.name }</Text>
                    </View>
                </View>
                <View style = {{ marginTop: 25, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', width: '100%'}}>
                    <View style = {{ marginTop: 20, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', }}>
                        <View style = {{ backgroundColor: '#B2BDB9', borderRadius: 10 }}>
                            <Ionicons name = 'briefcase' size = { 60 } color = '#2B5353' style = {{ padding: 5 }} />
                        </View>
                        <Text style= {{ marginTop: 5, color: '#F2F2F2', fontSize: 18, textAlign: 'center' }}>Experiência</Text>
                        <Text style= {{ color: '#F2F2F2', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>{ experienceText }</Text>
                    </View>
                    <View style = {{ marginTop: 20, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', }}>
                        <View style = {{ backgroundColor: '#B2BDB9', borderRadius: 10 }}>
                            <Ionicons name = 'people' size = { 60 } color = '#2B5353' style = {{ padding: 5 }} />
                        </View>
                        <Text style= {{ marginTop: 5, color: '#F2F2F2', fontSize: 18, textAlign: 'center' }}>Consultas</Text>
                        <Text style= {{ color: '#F2F2F2', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>{numberOfAppointments}</Text>
                    </View>
                    
                </View>
                <View style = {{ marginTop: 20, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', }}>
                    <View style = {{ backgroundColor: '#B2BDB9', borderRadius: 10 }}>
                        <Ionicons name = 'medical' size = { 60 } color = '#2B5353' style = {{ padding: 5 }} />
                    </View>
                    <Text style= {{ marginTop: 5, color: '#F2F2F2', fontSize: 18, textAlign: 'center' }}>Especialidade</Text>
                    <Text style= {{ color: '#F2F2F2', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>{ member.specialization.name }</Text>
                </View>
            </ScrollView>
            
            <Footer user = { user } disableProfileButton = { true }/>
            { spinnerState == true ? 
                <Spinner visible={spinnerState} />
            : null }  
        </SafeAreaView>
    )
}