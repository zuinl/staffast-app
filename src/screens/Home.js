import React, { Component } from 'react'
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    Linking,
    TouchableHighlight } 
    from 'react-native'

import { commonStyle, colors } from '../commonStyle'
import Header from '../components/Header'
import Loading from '../components/Loading'

import { AntDesign } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

import { AsyncStorage } from 'react-native'
export default class Home extends Component {

    state = {
        title: '',
        username: '',
        photo: null,
        isLoading: true
    }

    isLogged = async () => {
        const token = await AsyncStorage.getItem('user_token')

        if(token == null || token.trim() == '') {
            this.props.navigation.navigate('Login')
        }
    }

    getItems = async () => {
        const username = await AsyncStorage.getItem('user_name')
        const company = await AsyncStorage.getItem('company_name')
        const photo = await AsyncStorage.getItem('user_photo')

        this.setState({
            title: company + " - Staffast",
            username,
            photo,
            isLoading: false
        })
    }

    componentDidMount = async () => {
        await this.isLogged()
        this.getItems()
    }

    render() {
        return (
            <View style={commonStyle.container}>
                <Header title={this.state.title} onIconClick={this.props.navigation.openDrawer} />

                <Text style={commonStyle.h1Text}>Olá,</Text>
                <Text style={commonStyle.h3Text}>bem-vindo ao aplicativo do Staffast</Text>

                {this.state.isLoading ? <Loading animate={this.state.isLoading} /> : null }

                <Image source={{ uri: this.state.photo} } style={styles.image} />
                <Text style={commonStyle.h1Text}>{this.state.username}</Text>

                <View style={styles.buttonRow}>
                    <AntDesign name="menuunfold" size={24} color={colors.primary} />
                    <TouchableHighlight 
                        style={commonStyle.button1}
                        activeOpacity={0.6}
                        underlayColor={colors.primary}
                        onPress={() => this.props.navigation.openDrawer()}>
                        <Text style={commonStyle.buttonText}>Começar a navegar</Text>
                    </TouchableHighlight>
                </View>

                <View style={styles.buttonRow}>
                    <Entypo name="clock" size={24} color={colors.primary} />
                    <TouchableHighlight 
                    style={commonStyle.button1}
                    activeOpacity={0.6}
                    underlayColor={colors.primary}
                    onPress={() => this.props.navigation.navigate('Ponto')}>
                        <Text style={commonStyle.buttonText}>Registrar seu ponto eletrônico</Text>
                    </TouchableHighlight>
                </View>

                <View style={styles.buttonRow}>
                    <MaterialIcons name="people-outline" size={24} color={colors.primary} />
                    <TouchableHighlight 
                    style={commonStyle.button1}
                    activeOpacity={0.6}
                    underlayColor={colors.primary}
                    onPress={() => this.props.navigation.navigate('Ponto')}>
                        <Text style={commonStyle.buttonText}>Próximas reuniões</Text>
                    </TouchableHighlight>
                </View>
                
                <TouchableHighlight 
                    style={[commonStyle.button2, { marginTop: 10 }]}
                    activeOpacity={0.6}
                    underlayColor={colors.primary}
                    onPress={() => Linking.openURL('https://sistemastaffast.com/staffast/login.php') }>
                    <Text style={commonStyle.buttonText}>Ver/Editar sua conta</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 160,
        height: 160,
        margin: 10,
        borderRadius: 80
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})