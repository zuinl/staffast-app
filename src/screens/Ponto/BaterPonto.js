import React, { Component } from 'react'
import { Modal,
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback, 
    Alert} from 'react-native'
import * as Location from 'expo-location'
import { commonStyle, colors } from '../../commonStyle'
import { server, showError, showSuccess } from '../../functions'

import Loading from '../../components/Loading'

import { AsyncStorage } from 'react-native'

export default class BaterPonto extends Component {

    state = {
        obs: '',
        isLoading: false
    }

    isGPSEnabled = async () => {
        const isActive = await Location.hasServicesEnabledAsync()
        return isActive
    }

    baterPonto = async () => {
        this.setState({ isLoading: true })

        if(!this.isGPSEnabled()) {
            Alert.alert('GPS desativado', 'Por favor, ative a localização do seu dispositivo e tente novamente')
            this.setState({ isLoading: false })
            return
        }

        const isGranted = await Location.requestPermissionsAsync()
        
        if(isGranted.status !== 'granted') {
            Alert.alert('Acesso negado', 'Por favor, você precisa permitir acesso à localização do seu dispositivo')
            this.setState({ isLoading: false })
            return
        }
        
        const location = await Location.getCurrentPositionAsync({})

        const email = await AsyncStorage.getItem('user_email')
        const token = await AsyncStorage.getItem('user_token')
        const tipo = this.props.pontoType
        const anotacao = this.state.obs
        const latitude = location.coords.latitude
        const longitude = location.coords.longitude

        fetch(`${server}/ponto.php`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                token: token,
                tipo: tipo,
                latitude: latitude,
                longitude: longitude,
                anotacao: anotacao
            })
        }).then(async res => {
            const response = await res.json()
            if(response.sucesso) {
                showSuccess(response.mensagem)
            } else {
                showError(response.mensagem)
            }
        }).catch(err => Alert.alert('Erro de conexão', 'Ops... Houve um erro ao registrar seu ponto!'))

        this.setState({ isLoading: false })
    }

    render() {
        return (
            <Modal 
                transparent={true} 
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback 
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={[commonStyle.h3Text, { fontWeight: 'bold', color: '#FFF' }]}>Registrar ponto eletrônico - {this.props.title}</Text>
                    <TextInput style={commonStyle.input}
                        placeholder='Insira uma observação (opcional)'
                        onChangeText={obs => this.setState({obs})} 
                        value={this.state.obs}></TextInput>

                    {this.state.isLoading && <Loading animate={this.state.isLoading} color='#FFFFFF' /> }

                    <View style={styles.buttons}>
                        <TouchableOpacity style={commonStyle.button2} onPress={this.props.onCancel} disabled={!!this.state.isLoading}>
                            <Text style={commonStyle.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={commonStyle.button2} onPress={() => this.baterPonto()} disabled={!!this.state.isLoading}>
                            <Text style={commonStyle.buttonText}>Registrar</Text>
                        </TouchableOpacity>
                    </View>
                </View> 
                <TouchableWithoutFeedback 
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        flex: 0.6,
        backgroundColor: colors.primary,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})