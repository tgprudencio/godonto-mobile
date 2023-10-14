import  React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { CommonActions, useIsFocused } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Footer } from '../../components/Footer';

import { getAppointments, deleteAppointment } from '../../services/Http';
import globalVariables from '../../services/GlobalVariables';


export function History({ route, navigation }) {
    const { user } = route.params;
    const isFocused = useIsFocused();
    const [spinnerState, setSpinnerState] = useState(false);
    const [appointments, setAppointments] = useState([]);

    const validationAlert = (title, message) => Alert.alert(title, message);

    useEffect(() => {
        if (isFocused) {
            globalVariables.currentVisitedScreen = 'History';
            console.log(globalVariables.lastVisitedScreen, globalVariables.currentVisitedScreen);
            retrieveAppointments();
        }
    }, [isFocused])

    function retrieveAppointments() {
        setSpinnerState(true);
        getAppointments(user.id, 1)
        .then((res) => {
            setSpinnerState(false);
            setAppointments(res.data);
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
                        globalVariables.lastVisitedScreen = 'History';
                        navigation.dispatch(CommonActions.goBack());
                    }}>
                        <Ionicons name = 'arrow-back' color = '#F2F2F2' size = { 35 }/>
                    </TouchableOpacity>
                    <Text style = {{ marginLeft: 10, fontWeight: 'bold', fontSize: 20, color: '#F2F2F2', }}>Histórico de Consultas</Text>
                </View>
            </View>
            <ScrollView style = {{ width: '90%', alignSelf: 'center' }} >
                { appointments.map((appointment, index) => {
                    var days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
                    var months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
                    var d = new Date(appointment.date);
                    var dateString = d.toLocaleDateString();
                    var timeString = d.toLocaleTimeString().slice(0, 5) + 'h';     
                    
                    return (
                        <View key = { appointment.id } style = {{ marginTop: 15, width: '100%', maxWidth: 500, alignSelf: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#B2BDB9', borderRadius: 10, backgroundColor: '#596C72' }}>
                            <View style = {{ margin: 20 }}>
                                <View style = {{ flexDirection: 'row', }}>
                                    <Ionicons name = 'person-circle' size = { 64 } color = '#F2F2F2' />
                                    <View style = {{ alignSelf: 'center', marginLeft: 10 }}>
                                        <Text style = {{ color: '#F2F2F2', fontWeight: 'bold', fontSize: 18 }}>{ appointment.member.name }</Text>
                                        <Text style = {{ color: '#F2F2F2', fontSize: 16 }}>{ appointment.member.specialization.name }</Text>
                                    </View>
                                </View>
                                <View style = {{ flexDirection: 'row', marginHorizontal: 10, marginVertical: 5, justifyContent: 'space-between' }}>
                                    <View style = {{ flexDirection: 'row',  alignItems: 'center', }}>
                                        <Ionicons name = 'calendar' size = { 25 } color = '#F2F2F2' />
                                        <Text style = {{ marginLeft: 10, color: '#F2F2F2', fontWeight: 'bold' }}>{ dateString }</Text>
                                    </View>
                                    <View style = {{ flexDirection: 'row', alignItems: 'center', }}>
                                        <Ionicons name = 'time' size = { 25 } color = '#F2F2F2' />
                                        <Text style = {{ marginLeft: 10, color: '#F2F2F2', fontWeight: 'bold' }}>{ timeString }</Text>
                                    </View>
                                </View>
                                <View style = {{ marginHorizontal: 10, marginVertical: 5, alignItems: 'center', flexDirection: 'row', }}>
                                    <Ionicons name = 'location' size = { 25 } color = '#F2F2F2' />
                                    <Text style = {{ flex: 1, flexWrap: 'wrap', marginLeft: 10, color: '#F2F2F2', fontWeight: 'bold', textAlign:'justify' }}>Rua Um, 1234. Bairro Dois. Estado Quatro, Brasil.</Text>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
            
            <Footer user = { user } disableProfileButton = { false } highlightHome = { false } highlightProfile = { false }/>
            { spinnerState == true ? 
                <Spinner visible={spinnerState} />
            : null }  
        </SafeAreaView>
    )
}