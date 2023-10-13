import  React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { CommonActions, useIsFocused } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Footer } from '../../components/Footer';

import { getAppointments, deleteAppointment } from '../../services/Http';
import globalVariables from '../../services/GlobalVariables';


export function Appointment({ route, navigation }) {
    const { user } = route.params;
    const isFocused = useIsFocused();
    const [spinnerState, setSpinnerState] = useState(false);
    const [appointments, setAppointments] = useState([]);

    const validationAlert = (title, message) => Alert.alert(title, message);

    useEffect(() => {
        if (isFocused) {
            globalVariables.currentVisitedScreen = 'Appointment';
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

    function removeAppointment(appointmentId, date, time) {
        Alert.alert(
            'Atenção',
            'Deseja desmarcar a consulta marcada para ' + date + ' às ' + time + '?',
            [
                {
                    text: "Não",
                    style: "cancel"
                },
                { 
                  text: "Sim, desmarcar", onPress: () => {
                    setSpinnerState(true);
                    deleteAppointment(appointmentId)
                    .then((res) => {
                        setSpinnerState(false);
                        Alert.alert(
                            'Atenção',
                            'Consulta cancelada com sucesso!',
                            [
                                { 
                                text: "Ok", onPress: () => {
                                    retrieveAppointments();
                                }
                                }
                            ]
                        );
                    })
                    .catch((err) => {
                        console.log(err);
                        setSpinnerState(false);
                        validationAlert('Atenção', err.error);
                    })
                  }
                }
            ]
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style = {{ flexDirection: 'row', marginTop: 30, width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style = {{ flexDirection: 'row', alignItems: 'center', }} >
                    <TouchableOpacity onPress={ () => {
                        globalVariables.lastVisitedScreen = 'Appointment';
                        navigation.dispatch(CommonActions.goBack());
                    }}>
                        <Ionicons name = 'arrow-back' color = '#F2F2F2' size = { 35 }/>
                    </TouchableOpacity>
                    <Text style = {{ marginLeft: 10, fontWeight: 'bold', fontSize: 20, color: '#F2F2F2', }}>Consultas</Text>
                </View>
                <TouchableOpacity 
                    style = {{ flexDirection: 'row', backgroundColor: '#2DD36F', width: 135, height: 35, borderRadius: 10, alignItems: 'center', justifyContent: 'space-evenly'}}
                    onPress = { () => {
                        globalVariables.lastVisitedScreen = 'Appointment';
                        navigation.navigate('AppointmentNew', { user: user });
                    }}
                >
                    <Ionicons name = 'add' size = { 24 } color = '#F2F2F2' />
                    <Text style = {{ color: '#F2F2F2', fontWeight: 'bold', }}>Nova consulta</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style = {{ width: '90%', alignSelf: 'center' }} >
                { appointments.map(({ id, date, member, past, cancelable }, index) => {    
                    var days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
                    var months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
                    var d = new Date(date);
                    var dayName = days[d.getDay()];
                    var monthName = months[d.getMonth()];
                    var dateString = dayName + ', ' + d.toISOString().slice(8,10) + ' ' + monthName;
                    var timeString = d.toLocaleTimeString().slice(0, 5) + 'h';     
                    
                    return (
                        <View key = { id } style = {{ marginTop: 15, width: '100%', justifyContent: 'center', borderWidth: 3, borderColor: '#B2BDB9', borderRadius: 10, backgroundColor: '#596C72' }}>
                            <View style = {{ margin: 20 }}>
                                <View style = {{ flexDirection: 'row', }}>
                                    <Ionicons name = 'person-circle' size = { 64 } color = '#F2F2F2' />
                                    <View style = {{ alignSelf: 'center', marginLeft: 10 }}>
                                        <Text style = {{ color: '#F2F2F2', fontWeight: 'bold', fontSize: 18 }}>{ member.name }</Text>
                                        <Text style = {{ color: '#F2F2F2', fontSize: 16 }}>{ member.specialization.name }</Text>
                                    </View>
                                </View>
                                <View style = {{ marginVertical: 10, flexDirection: 'row', backgroundColor: '#4C5B62', borderRadius: 10, justifyContent: 'space-evenly' }}>
                                    <View style = {{ flexDirection: 'row', margin: 20, alignItems: 'center', }}>
                                        <Ionicons name = 'calendar' size = { 25 } color = '#F2F2F2' />
                                        <Text style = {{ marginLeft: 10, color: '#F2F2F2', fontWeight: 'bold' }}>{ dateString }</Text>
                                    </View>
                                    <View style = {{ flexDirection: 'row', margin: 20, alignItems: 'center', }}>
                                        <Ionicons name = 'time' size = { 25 } color = '#F2F2F2' />
                                        <Text style = {{ marginLeft: 10, color: '#F2F2F2', fontWeight: 'bold' }}>{ timeString }</Text>
                                    </View>
                                </View>
                                <View style = {{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-around' }}>
                                    { !past ? 
                                        <>
                                            <TouchableOpacity 
                                                style = {{ width: 120, height: 40, borderWidth: 2, borderRadius: 20, borderColor: '#F2F2F2', alignItems: 'center', justifyContent: 'center' }}
                                                onPress = { () => removeAppointment(id, dateString, timeString) }
                                            >
                                                <Text style = {{ color: '#F2F2F2', fontWeight: 'bold' }}>Cancelar</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity 
                                                style = {{ width: 120, height: 40, borderRadius: 20, backgroundColor: '#FF4500', alignItems: 'center', justifyContent: 'center' }}
                                                onPress = { () => console.log('alterar agendamento') }
                                            >
                                                <Text style = {{ color: '#F2F2F2', fontWeight: 'bold' }}>Alterar</Text>
                                            </TouchableOpacity>
                                        </>
                                        :
                                        <View style = {{ alignSelf: 'center' }}>
                                            <Text style = {{ color: '#2DD36F', fontWeight: 'bold', fontSize: 16 }}>Consulta finalizada</Text>
                                        </View>
                                    }
                                    
                                </View>
                            </View>
                            
                        </View>
                    );
                })}
            </ScrollView>
            
            <Footer user = { user } disableProfileButton = { false }/>
            { spinnerState == true ? 
                <Spinner visible={spinnerState} />
            : null }  
        </SafeAreaView>
    )
}