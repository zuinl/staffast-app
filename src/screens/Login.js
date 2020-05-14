import React, { Component } from 'react'
import { 
    View, 
    Text,
    Image,
    TextInput,
    Dimensions,
    TouchableHighlight, 
    BackHandler,
    TouchableOpacity,
    Linking,
    Alert,
    StyleSheet } from 'react-native'
import { AsyncStorage } from 'react-native'
import { Entypo } from '@expo/vector-icons' 
import { Feather } from '@expo/vector-icons'

import { commonStyle, colors } from '../commonStyle'
import { server, showError } from '../functions'
import Loading from '../components/Loading'

export default class Login extends Component {

    state = {
        email: '',
        password: '',
        isLoading: false
    }

    componentDidMount = () => {
        this.onLogout()
        BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    }

    backPressed = () => {
        this.props.navigation.navigate('Login')
    }

    onLogout = async () => {
        await AsyncStorage.setItem('user_token', '')
        await AsyncStorage.setItem('user_email', '')
        await AsyncStorage.setItem('user_name', '')
        await AsyncStorage.setItem('company_name', '')
        await AsyncStorage.setItem('user_photo', '')
        await AsyncStorage.setItem('company_plan', '')
    }

    onLogin = async () => {
        this.setState({ isLoading: true })

        if(this.state.email.trim() === '' || this.state.password.trim() === '') {
            this.setState({ isLoading: false })
            Alert.alert('Dados inválidos', 'Por favor, insira o e-mail e a senha de acesso')
            return
        }

        await fetch(`${server}/login.php`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                senha: this.state.password
            })
        }).then(async res => {
            const data = await res.json() 
            
            if(data.sucesso) {
                await AsyncStorage.setItem('user_name', data.nome)
                await AsyncStorage.setItem('user_email', this.state.email)
                await AsyncStorage.setItem('user_token', data.token)
                await AsyncStorage.setItem('company_name', data.empresa)
                await AsyncStorage.setItem('user_photo', data.foto)
                await AsyncStorage.setItem('company_plan', data.plano)

                this.props.navigation.navigate('Home')
            } else {
                this.setState({ isLoading: false })
                Alert.alert('Dados inválidos', 'Você provavelmente inseriu alguma informação errada ou não possui cadastro')
            }
        }).catch(err => showError(err))
    }

    infoAlert = () => {
        Alert.alert('Informações', 'Para acessar o aplicativo do Staffast, você precisa ser vinculado a uma de nossas empresas parceiras e possuir conta no Staffast. Se estiver em dúvida, entre em contato com o RH da sua empresa.')
    }

    render() {
        return (
            <View style={[commonStyle.container]}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/img/banner.jpg')} style={styles.logo} />
                </View>

                <View style={styles.loginContainer}>
                    <Text style={[commonStyle.h2Text, { marginBottom: 50, color: '#FFFFFF' }]}>Insira seus dados</Text>

                    <View style={styles.input}>
                        <Entypo name="email" size={22} color={colors.primary} style={styles.icon}  />
                        <TextInput 
                        // style={commonStyle.input}
                        textContentType='emailAddress'
                        placeholder='E-mail'
                        onChangeText={email => this.setState({ email })} />
                    </View>

                    <View style={styles.input}>
                        <Feather name="lock" size={22} color={colors.primary} style={styles.icon}  />
                        <TextInput 
                        // style={commonStyle.input}
                        secureTextEntry={true}
                        placeholder='Senha'
                        onChangeText={password => this.setState({ password })} />
                    </View>

                    {this.state.isLoading ? <Loading animated={this.state.isLoading} color="#FFFFFF" /> : null }

                    <TouchableHighlight style={commonStyle.button2} 
                     activeOpacity={0.6}
                     underlayColor={colors.primary}
                     disabled={this.props.isLoading}
                     onPress={() => this.onLogin()} >
                        <Text style={commonStyle.buttonText}>Entrar</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={commonStyle.button2} 
                     activeOpacity={0.6}
                     underlayColor={colors.secundary}
                     disabled={this.state.isLoading}
                     onPress={() => Linking.openURL('https://sistemastaffast.com/staffast/recuperarSenha.php') } >
                        <Text style={commonStyle.buttonText}>Esqueci minha senha</Text>
                    </TouchableHighlight>

                    <TouchableOpacity onPress={() => this.infoAlert()} disabled={this.state.isLoading} >
                        <Text style={[commonStyle.text,  { color: '#FFFFFF' }]}>Dúvidas?</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginContainer: {
        flex: 7,
        width: '90%',
        margin: 5,
        padding: 10,
        marginTop: 50,
        borderRadius: 10,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        flexDirection: 'row',
        width: '90%',
        margin: 5,
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#FFFFFF'
    },
    icon: {
        marginRight: 15
    },
    logo: {
        width: Dimensions.get('window').width / 100 * 90,
        height: 200
    }
})