import  React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';

import { Footer } from '../../components/Footer';
import { CommonActions, useIsFocused } from '@react-navigation/native';
import globalVariables from '../../services/GlobalVariables';

import { updateUser } from '../../services/Http';

export function Profile({ route, navigation }) {
    const isFocused = useIsFocused();
    const { user } = route.params;
    const [nameText, setNameText] = React.useState(user.name);
    const [emailText, setEmailText] = React.useState(user.email);
    const [oldpasswordText, setOldPasswordText] = React.useState('');
    const [newPasswordText, setNewPasswordText] = React.useState('');
    const [confirmNewPasswordText, setConfirmNewPasswordText] = React.useState('');

    const [spinnerState, setSpinnerState] = useState(false);

    const validationAlert = (title, message) => Alert.alert(title, message);

    useEffect(() => {
        if (isFocused) {
            globalVariables.currentVisitedScreen = 'Profile';
        }
    }, [isFocused]);
    
    function updateUserInfo() {
        if ( user.name == nameText && user.email == emailText && 
            !oldpasswordText && !newPasswordText && !confirmNewPasswordText
        ) {
            return validationAlert('Atenção', 'Não houve mudanças no dados cadastrais para serem atualizadas');
        }
        if (oldpasswordText.length > 0 && (!newPasswordText || !confirmNewPasswordText)) {
            return validationAlert('Atenção', 'Preencha os campos \"Nova Senha\" e \"Confirmar Nova Senha\" para alterar sua senha');
        }
        if (!oldpasswordText && (newPasswordText || confirmNewPasswordText)) {
            return validationAlert('Atenção', 'Preencha o campo \"Senha Atual\" para alterar sua senha');
        }
        if (newPasswordText != confirmNewPasswordText) {
            return validationAlert('Atenção', 'Sua nova senha nos campos \"Nova senha\" e \"Confirmar Nova Senha\" estão diferentes');
        }
        if (newPasswordText.legnth < 6 || confirmNewPasswordText.length < 6) {
            return validationAlert('Atenção', 'Sua nova senha deve ser superior a 6 (seis) caracteres');
        }

        setSpinnerState(true);
        
        updateUser(nameText, emailText, oldpasswordText, newPasswordText, confirmNewPasswordText)
        .then((res) => {
            setSpinnerState(false);
            if (res.status == 200) {
                Alert.alert(
                    'Atenção',
                    'Dados alterados com sucesso!',
                    [
                        { text: "Ok", onPress: () => {
                            user.name = nameText;
                            user.email = emailText;
                            navigation.navigate('Home', { user: user });
                        }}
                    ]
                );
            } else {
                validationAlert('Atenção', res.data.error)
            }
            
        })
        .catch((err) => {
            console.log('Handle submit error!');
            setSpinnerState(false);
            validationAlert('Atenção', err.error);
        });
    }

    function logOut() {
        Alert.alert(
            'Atenção',
            'Deseja sair do aplicativo?',
            [
                { text: "Não", style: "cancel" },
                { text: "Sim", onPress: () => navigation.navigate('Login') }
            ]
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style = {{ flexDirection: 'row', marginTop: 30, width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style = {{ flexDirection: 'row', alignItems: 'center', }} >
                    <TouchableOpacity onPress={ () => {
                        globalVariables.lastVisitedScreen = 'Profile';
                        navigation.dispatch(CommonActions.goBack());
                    }}>
                        <Ionicons name = 'arrow-back' color = '#F2F2F2' size = { 35 }/>
                    </TouchableOpacity>
                    <Text style = {{ marginLeft: 10, fontWeight: 'bold', fontSize: 20, color: '#F2F2F2', }}>Perfil</Text>
                </View>
            </View>
            <ScrollView style = {{ width: '90%', alignSelf: 'center' }}>
                <Text style = {{ marginTop: 30, color: '#C7D0D0', fontSize: 16,  }}>Nome Completo</Text>
                <TextInput
                    style = {{ marginTop: 10, padding: 10, height: 45, color: '#F2F2F2', backgroundColor: '#2B5353', borderRadius: 10, fontStyle:'italic', fontWeight: '500' }}
                    placeholder = 'Digite aqui seu nome completo'
                    placeholderTextColor = '#8EA2A2'
                    onChangeText = { setNameText }
                    value = { nameText }
                    editable = { !spinnerState }
                    //autoCapitalize = 'none'
                />
                <Text style = {{ marginTop: 20, color: '#C7D0D0', fontSize: 16,  }}>Email</Text>
                <TextInput
                    style = {{ marginTop: 10, padding: 10, height: 45, color: '#F2F2F2', backgroundColor: '#2B5353', borderRadius: 10, fontStyle:'italic', fontWeight: '500' }}
                    placeholder = 'Digite aqui seu email'
                    placeholderTextColor = '#8EA2A2'
                    onChangeText = { setEmailText }
                    value = { emailText }
                    editable = { !spinnerState }
                    autoCapitalize = 'none'
                />
                <Text style = {{ marginTop: 20, color: '#C7D0D0', fontSize: 16, }}>Senha Atual</Text>
                <TextInput
                    style = {{ marginTop: 10, padding: 10, height: 45, color: '#F2F2F2', backgroundColor: '#2B5353', borderRadius: 10, fontStyle:'italic', fontWeight: '500' }}
                    placeholder = 'Digite aqui sua senha antiga'
                    placeholderTextColor = '#8EA2A2'
                    secureTextEntry = {true}
                    onChangeText = { setOldPasswordText }
                    value = { oldpasswordText }
                    editable = { !spinnerState }
                    autoCapitalize = 'none'
                />
                <Text style = {{ marginTop: 20, color: '#C7D0D0', fontSize: 16, }}>Nova Senha</Text>
                <TextInput
                    style = {{ marginTop: 10, padding: 10, height: 45, color: '#F2F2F2', backgroundColor: '#2B5353', borderRadius: 10, fontStyle:'italic', fontWeight: '500' }}
                    placeholder = 'Digite aqui sua nova senha'
                    placeholderTextColor = '#8EA2A2'
                    secureTextEntry = {true}
                    onChangeText = { setNewPasswordText }
                    value = { newPasswordText }
                    editable = { !spinnerState }
                    autoCapitalize = 'none'
                />
                <Text style = {{ marginTop: 20, color: '#C7D0D0', fontSize: 16, }}>Confirmar Nova Senha</Text>
                <TextInput
                    style = {{ marginTop: 10, padding: 10, height: 45, color: '#F2F2F2', backgroundColor: '#2B5353', borderRadius: 10, fontStyle:'italic', fontWeight: '500' }}
                    placeholder = 'Confirme aqui sua nova senha'
                    placeholderTextColor = '#8EA2A2'
                    secureTextEntry = {true}
                    onChangeText = { setConfirmNewPasswordText }
                    value = { confirmNewPasswordText }
                    editable = { !spinnerState }
                    autoCapitalize = 'none'
                />

                <View style = {{ marginTop: 50, width: '100%', flex: 1, alignSelf: 'center', alignItems: 'center',  }}>
                    <TouchableOpacity 
                        style = {{ backgroundColor: '#FF4500', borderRadius: 10, width: '100%', height: 40, alignItems: 'center', justifyContent: 'center' }}
                        onPress={ () => updateUserInfo() }
                    >
                        <Text style = {{ color: '#F2F2F2', fontSize: 16, fontWeight: 'bold' }}>Salvar Alterações</Text>
                    </TouchableOpacity>   
                    <TouchableOpacity 
                        style = {{ marginTop: 20, marginBottom: 10, borderWidth: 3, borderColor: '#FF4500', borderRadius: 10, width: '100%', height: 40, alignItems: 'center', justifyContent: 'center' }}
                        onPress={ () => logOut() }
                    >
                        <Text style = {{ color: '#F2F2F2', fontSize: 16, fontWeight: 'bold' }}>Sair do Aplicativo</Text>
                    </TouchableOpacity>                    
                </View>
            </ScrollView>
            
            <Footer user = { user } disableProfileButton = { false } highlightHome = { false } highlightProfile = { true }/>
            { spinnerState == true ? 
                <Spinner visible={spinnerState} />
            : null }  
        </SafeAreaView>
    )
}