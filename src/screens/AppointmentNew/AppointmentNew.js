import  React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { CommonActions, useIsFocused } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Footer } from '../../components/Footer';

import { getMembers, getAvailableDates, getAvailableTimes, createAppointment } from '../../services/Http';
import globalVariables from '../../services/GlobalVariables';


export function AppointmentNew({ route, navigation }) {
    const { user } = route.params;
    const isFocused = useIsFocused();
    const [spinnerState, setSpinnerState] = useState(false);
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState();
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState();
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState();

    const validationAlert = (title, message) => Alert.alert(title, message);

    useEffect(() => {
        retrieveMembers();
    }, []);

    useEffect(() => {
        if (isFocused) {
            globalVariables.currentVisitedScreen = 'AppointmentNew';
            console.log(globalVariables.lastVisitedScreen, globalVariables.currentVisitedScreen);
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

    const handleSelectMember = (id) => {
        var data = [];
        var allMembers = members;
        allMembers.map((item, index) => {
            if (item.id == id) {
                item.selected = true;
                setSelectedMember(item);
            } else {
                item.selected = false;
            }
            data[index] = item;
        });
        setMembers(data);
    }

    useEffect(() => {
        if (selectedMember) {
            setSpinnerState(true);
            setAvailableDates([]);
            setAvailableTimes([]);
            setSelectedDate();
            setSelectedTime();
            getAvailableDates()
            .then((res) => {
                setSpinnerState(false);
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].selected = false;
                }
                setAvailableDates(res.data);
            })
            .catch((err) => {
                console.log(err);
                setSpinnerState(false);
                validationAlert('Atenção', err.error);
            });
        }
    }, [selectedMember]);

    const handleSelectDate = (id) => {
        var data = [];
        var allDates = availableDates;
        allDates.map((item, index) => {
            if (item.id == id) {
                item.selected = true;
                setSelectedDate(item);
            } else {
                item.selected = false;
            }
            data[index] = item;
        });
        setAvailableDates(data);
    }

    useEffect(() => {
        if (selectedDate) {
            var pickedMember = selectedMember;
            var pickedDate = selectedDate;
            setSpinnerState(true);
            setAvailableTimes([]);
            setSelectedTime();
            getAvailableTimes(pickedMember.id, new Date(pickedDate.name).getTime())
            .then((res) => {
                var available = [];
                setSpinnerState(false);
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].selected = false;
                    if (res.data[i].available) {
                        available.push(res.data[i]);
                    }
                }
                setAvailableTimes(available);
            })
            .catch((err) => {
                console.log(err);
                setSpinnerState(false);
                validationAlert('Atenção', err.error);
            });
        }
    }, [selectedDate]);

    const handleSelectTime = (value) => {
        var data = [];
        var allTimes = availableTimes;
        allTimes.map((item, index) => {
            if (item.value == value) {
                item.selected = true;
                setSelectedTime(item);
            } else {
                item.selected = false;
            }
            data[index] = item;
        });
        setAvailableTimes(data);
    }

    const bookAppointment = (pickedUser, pickedMember, pickedTime) => {
        setSpinnerState(true);
        createAppointment(pickedUser.id, pickedMember.id, pickedTime.value)
        .then((res) => {
            if (res.status == 200) {
                setTimeout(() => {
                    setSpinnerState(false);
                    Alert.alert(
                        'Atenção',
                        'Consulta agendada com sucesso!',
                        [{ 
                            text: "Ok", onPress: () => {
                                navigation.dispatch(CommonActions.goBack());
                            }
                        }]
                    );
                }, 500);
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
                        globalVariables.lastVisitedScreen = 'AppointmentNew';
                        navigation.dispatch(CommonActions.goBack());
                    }}>
                        <Ionicons name = 'arrow-back' color = '#F2F2F2' size = { 35 }/>
                    </TouchableOpacity>
                    <Text style = {{ marginLeft: 10, fontWeight: 'bold', fontSize: 20, color: '#F2F2F2', }}>Agendar Consulta</Text>
                </View>
            </View>
            <ScrollView style = {{ width: '90%', alignSelf: 'center' }} >
                
                <Text style = {{ marginTop: 20, fontWeight: 'bold', fontSize: 16, color: '#F2F2F2', }}>Profissionais disponíveis</Text>
                <ScrollView horizontal>
                    { members.map(({ id, name, selected }) => {                         
                        return (
                            <TouchableOpacity 
                                key = { id } 
                                style = {{ marginTop: 15, marginHorizontal: 10, width: 100, alignItems: 'center', justifyContent: 'center', minHeight: 120, borderWidth: 2, borderColor: '#F2F2F2', borderRadius: 20, backgroundColor: selected ? '#FF4500' : '#2B5353' }}
                                onPress = { () => handleSelectMember(id) }
                            >
                                <View style = {{ padding: 5, alignItems: 'center', }}>
                                    <Ionicons name = 'person-circle' size = { 55 } color = '#F2F2F2' />
                                    <Text style = {{ marginTop: 5, fontWeight: 'bold', color: '#F2F2F2', padding: 5, textAlign: 'center' }}>{ name }</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                { selectedMember && availableDates.length > 0 ?
                    <View>
                        <Text style = {{ marginTop: 20, fontWeight: 'bold', fontSize: 16, color: '#F2F2F2', }}>Datas disponíveis</Text>
                        <ScrollView horizontal>
                            { availableDates.map(({ id, name, selected }) => {  
                                var days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
                                var d = new Date(name);
                                var dayName = days[d.getDay()];
                                var dateString = d.toLocaleDateString().slice(0, 5);
                                return (
                                    <TouchableOpacity 
                                        key = { id } 
                                        style = {{ marginTop: 15, marginHorizontal: 10, width: 80, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#F2F2F2', borderRadius: 10, backgroundColor: selected ? '#FF4500' : '#2B5353' }}
                                        onPress = { () => handleSelectDate(id) }
                                    >
                                        <View style = {{ padding: 5, alignItems: 'center', }}>
                                            <Text style = {{ fontWeight: 'bold', color: '#F2F2F2', textAlign: 'center' }}>{ dateString }</Text>
                                            <Text style = {{ marginTop: 5, fontWeight: 'bold', color: '#F2F2F2',  textAlign: 'center' }}>{ dayName }</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>
                : null }

                { selectedDate && availableTimes.length > 0 ?
                    <View>
                        <Text style = {{ marginTop: 20, fontWeight: 'bold', fontSize: 16, color: '#F2F2F2', }}>Horários disponíveis</Text>
                        <ScrollView horizontal>
                            { availableTimes.map(({ time, value, selected }, index) => {  
                                return (
                                    <TouchableOpacity 
                                        key = { index } 
                                        style = {{ marginTop: 15, marginHorizontal: 10, width: 80, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#F2F2F2', borderRadius: 10, backgroundColor: selected ? '#FF4500' : '#2B5353' }}
                                        onPress = { () => handleSelectTime(value) }
                                    >
                                        <View style = {{ padding: 5, alignItems: 'center', }}>
                                            <Text style = {{ fontWeight: 'bold', color: '#F2F2F2', textAlign: 'center' }}>{ time }</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>
                : null }
                
            </ScrollView>

            <TouchableOpacity 
                style = {{ marginVertical: 15, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', width: '90%', maxWidth: 500, backgroundColor: '#FF4500', borderRadius: 10, height: 45, opacity: (!selectedMember || !selectedDate || !selectedTime) ? 0.5 : 1 }}
                disabled = { !selectedMember || !selectedDate || !selectedTime }
                onPress = { () => bookAppointment(user, selectedMember, selectedTime) }
            >
                <Text style = {{ color: '#F2F2F2', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Realizar Agendamento</Text>
            </TouchableOpacity>
            
            <Footer user = { user } disableProfileButton = { true }/>
            { spinnerState == true ? 
                <Spinner visible={spinnerState} />
            : null }  
        </SafeAreaView>
    )
}