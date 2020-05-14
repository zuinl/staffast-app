import React, { Component } from 'react'
import { 
    View, 
    Text,
    TextInput,
    TouchableHighlight,
    Picker,
    Alert } from 'react-native'
import { connect } from 'react-redux'

import { commonStyle, colors } from '../../commonStyle'
import Header from '../../components/Header'
import Loading from '../../components/Loading'
import { sendFeedback } from '../../actions/Feedbacks'

import { AsyncStorage } from 'react-native'
import { server, showError } from '../../functions'

class EnviarFeedback extends Component {

    state = {
        title: 'Enviar feedback',
        isLoading: true,
        feedback: '',
        comecar: '',
        continuar: '',
        parar: '',
        destinatario: '',
        colaboradores: [],
        gestores: []
    }

    componentDidMount = () => {
        this.fetchNomes()
    }

    onSend = async () => {
        this.setState({ isLoading: true })

        if(this.state.destinatario.trim() === '' || this.state.destinatario.trim() === 'GESTORES' || this.state.destinatario.trim() === 'COLABORADORES') {
            this.setState({ isLoading: false })
            Alert.alert('Destinatário', 'Selecione um destinatário válido')
            return
        }

        if(this.state.feedback.trim() === '') {
            this.setState({ isLoading: false })
            Alert.alert('Feedback', 'Insira pelo menos o primeiro campo para o seu feedback')
            return
        }

        const email = await AsyncStorage.getItem('user_email')
        const token = await AsyncStorage.getItem('user_token')
        const user = { email, token }

        const feedback = {
            destinatario: this.state.destinatario,
            feedback: this.state.feedback,
            comecar: this.state.comecar,
            continuar: this.state.continuar,
            parar: this.state.parar
        }

        this.props.sendFeedback(feedback, user)
        this.setState({ isLoading: false })
        this.props.navigation.navigate('FeedbacksEnviados')
    }

    fetchNomes = async () => {
        const email = await AsyncStorage.getItem('user_email')
        const token = await AsyncStorage.getItem('user_token')

        await fetch(`${server}/getColaboradoresList.php`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                token: token
            })
        }).then(async res => {
            const data = await res.json()
            if(data.length > 0 && data[0].sucesso) {
                let tempColaboradores = []
                data.map(nome => {
                    tempColaboradores.push({
                        id: nome.cpf,
                        nome: nome.nome
                    })
                })
                this.setState({ colaboradores: tempColaboradores })
            }
            
            await fetch(`${server}/getGestoresList.php`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    token: token
                })
            }).then(async res => {
                const data = await res.json()
                if(data.length > 0 && data[0].sucesso) {
                    let tempGestores = []
                    data.map(nome => {
                        tempGestores.push({
                            id: nome.cpf,
                            nome: nome.nome
                        })
                    })
                    this.setState({ gestores: tempGestores })
                }
            })

            this.setState({ isLoading: false })
        }).catch(err => console.log(err))
    }

    render() {
        return (
            <View style={commonStyle.container}>
                <Header title={this.state.title} onIconClick={this.props.navigation.openDrawer} />

                <Text style={[commonStyle.h2Text, { marginBottom: 30 }]}>Envie um feedback</Text>

                <Picker
                 style={commonStyle.input}
                 selectedValue={this.state.destinatario}
                 onValueChange={itemValue => this.setState({ destinatario: itemValue })} >
                    <Picker.Item label='Selecione um destinatário' value='' key='' enabled={false} />
                    <Picker.Item label='COLABORADORES' value='COLABORADORES' key='COLABORADORES' enabled={false} />
                     {
                         this.state.colaboradores.map(nome => {
                             return (
                                <Picker.Item label={nome.nome} value={nome.id} key={Math.random()} />
                             )
                         })
                    }
                    <Picker.Item label='GESTORES' value='GESTORES' key='GESTORES' enabled={false} />
                    {
                         this.state.gestores.map(nome => {
                            return (
                                <Picker.Item label={nome.nome} value={nome.id} key={Math.random()} />
                             )
                         })
                     }
                </Picker>

                <TextInput 
                  style={commonStyle.input}
                  placeholder='Escreva um feedback'
                  value={this.state.feedback}
                  onChangeText={feedback => this.setState({ feedback })} />

                <TextInput 
                  style={commonStyle.input}
                  placeholder='Deve começar a fazer... (opcional)'
                  value={this.state.comecar}
                  onChangeText={comecar => this.setState({ comecar })} />

                <TextInput 
                  style={commonStyle.input}
                  placeholder='Deve continuar fazendo... (opcional)'
                  value={this.state.continuar}
                  onChangeText={continuar => this.setState({ continuar })} />

                <TextInput 
                  style={commonStyle.input}
                  placeholder='Deve parar de fazer... (opcional)'
                  value={this.state.parar}
                  onChangeText={parar => this.setState({ parar })} />

                {this.state.isLoading ? <Loading animate={this.state.isLoading} /> : null }

                <TouchableHighlight style={commonStyle.button1} 
                activeOpacity={0.6}
                underlayColor={colors.primary}
                disabled={this.state.isLoading}
                onPress={() => this.onSend()} >
                    <Text style={commonStyle.buttonText}>Enviar feedback</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendFeedback: (feedback, user) => dispatch(sendFeedback(feedback, user))
    }
}

export default connect(null, mapDispatchToProps)(EnviarFeedback)