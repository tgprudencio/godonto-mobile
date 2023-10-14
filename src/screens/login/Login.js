import  React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { signIn } from '../../services/Http';
import globalVariables from '../../services/GlobalVariables';


export function Login({ route, navigation }) {

    const [selectedForm, setSelectedForm] = useState('user');
    const [usernameText, setUsernameText] = React.useState('');
    const [passwordText, setPasswordText] = React.useState('');
    const [isSignInButtonPressed, setIsSignInButtonPressed] = useState(false);
    const [isSignUpButtonPressed, setIsSignUpButtonPressed] = useState(false);
    const [spinnerState, setSpinnerState] = useState(false);

    const validationAlert = (title, message) => Alert.alert(title, message);
    

/*    useEffect(() => {   
        console.log(selectedForm);
    }, [selectedForm]);*/

    useEffect(() => {   
        if (isSignInButtonPressed) {
            setSpinnerState(true);
            setTimeout(() => {
                if (!usernameText || !passwordText) {
                    setIsSignInButtonPressed(false);
                    setSpinnerState(false);
                    return validationAlert('Atenção', 'Preencha os campos de email e senha.');
                }
                setIsSignInButtonPressed(false);                
                setTimeout(() => {
                    signIn(usernameText.toLowerCase(), passwordText)
                    .then((res) => {
                      if (res.status == 200) { // Success
                        setSpinnerState(false);
                        globalVariables.lastVisitedScreen = 'Login';
                        navigation.navigate('Home', { user: res.data.user });
                      } else if (res.status == 403) { // Invalid credentials
                        console.log('login credentials failed!');
                        Alert.alert('Atenção', 'Usuário e/ou senha inválida.');
                        setSpinnerState(false);
                      } else { // Error
                        console.log('Handle submit failed!');
                        console.log(res.data);
                        Alert.alert('Atenção', res.data.error);
                        setSpinnerState(false);
                      }
                    })
                    .catch((err) => {
                      console.log('Handle submit error!');
                      setSpinnerState(false);
                      validationAlert('Atenção', err.error);
                    });
                  }, 1000);
            }, 1000);
        }
    }, [isSignInButtonPressed]);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 5, backgroundColor: '#2B5353', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                <View style = {{ width: '90%', flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', }}>
                    <Image style = {{ flex: 1,  width: 150, }} resizeMode = 'contain' source = { require('../../assets/logo.png') } />
                    <View style = {{ flexDirection: 'row',  width: 300, justifyContent: 'space-around' }}>
                        <TouchableOpacity 
                            style = {{ alignSelf: 'flex-end',  height: 40, justifyContent: 'center', borderBottomWidth: selectedForm == 'user' ? 3 : 0, borderColor: '#FF4500' }}
                            onPress = { () => setSelectedForm('user') }
                        >
                            <Text style = {{ fontWeight: 'bold', fontSize: 18, color: '#F2F2F2', paddingHorizontal: 10, }}>Sou Paciente</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style = {{ alignSelf: 'flex-end', justifyContent: 'center', height: 40, borderBottomWidth: selectedForm == 'provider' ? 3 : 0, borderColor: '#FF4500' }}
                            onPress = { () => setSelectedForm('provider') }
                        >
                            <Text style = {{ fontWeight: 'bold', fontSize: 18, color: '#F2F2F2', paddingHorizontal: 10 }}>Clínica</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View >
            <View style = {{ flex: 6 }}>
                <View style = {{ width: '90%', flex: 1, alignSelf: 'center', }}>
                    <Text style = {{ marginTop: 30, color: '#C7D0D0', fontSize: 16, fontWeight: 'bold' }}>Email</Text>
                    <TextInput
                        style = {{ marginTop: 10, padding: 10, height: 45, color: '#F2F2F2', backgroundColor: '#2B5353', borderRadius: 10, fontStyle:'italic' }}
                        keyboardType = 'email-address'
                        placeholder = 'Digite aqui seu email'
                        placeholderTextColor = '#8EA2A2'
                        onChangeText = { setUsernameText }
                        value = { usernameText }
                        editable = { !spinnerState }
                        autoCapitalize = 'none'
                    />
                    <Text style = {{ marginTop: 30, color: '#C7D0D0', fontSize: 16, fontWeight: 'bold' }}>Senha</Text>
                    <TextInput
                        style = {{ marginTop: 10, padding: 10, height: 45, color: '#F2F2F2', backgroundColor: '#2B5353', borderRadius: 10, fontStyle:'italic' }}
                        placeholder = 'Digite aqui sua senha'
                        placeholderTextColor = '#8EA2A2'
                        secureTextEntry = {true}
                        onChangeText = { setPasswordText }
                        value = { passwordText }
                        editable = { !spinnerState }
                        autoCapitalize = 'none'
                    />
                </View>
            </View>
            <View style = {{ flex: 2, }}>
                <View style = {{  width: '90%', flex: 1, alignSelf: 'center', alignItems: 'center',  }}>
                    <TouchableOpacity 
                        style = {{ backgroundColor: '#FF4500', borderRadius: 10, width: '100%', height: 40, alignItems: 'center', justifyContent: 'center' }}
                        onPress={ () => setIsSignInButtonPressed(true) }
                    >
                        <Text style = {{ color: '#F2F2F2', fontSize: 16, fontWeight: 'bold' }}>Entrar</Text>
                    </TouchableOpacity>
                    { selectedForm == 'user' ? 
                        <TouchableOpacity 
                            style = {{ marginTop: 5, borderRadius: 10, width: 125, height: 40, alignItems: 'center', justifyContent: 'center' }}
                            onPress={ () => console.log('criar nova conta...') }
                        >
                            <Text style = {{ color: '#FF4500', fontSize: 16, fontWeight: 'bold' }}>Cadastre-se</Text>
                        </TouchableOpacity>
                    : null }
                    
                </View>
            </View>
            { spinnerState == true ? 
                <Spinner visible={spinnerState} />
            : null }  
        </SafeAreaView>
    );
}