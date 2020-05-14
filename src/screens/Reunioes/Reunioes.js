import React, { Component } from 'react'
import { 
    View, 
    Text,
    FlatList,
    Alert,
    TouchableHighlight,
    StyleSheet } from 'react-native'
import { AsyncStorage } from 'react-native'

import { commonStyle, colors } from '../../commonStyle'
import { server } from '../../functions'
import Header from '../../components/Header'
import Loading from '../../components/Loading'
import ReuniaoCard from '../../components/Reunioes/ReuniaoCard'

import { SimpleLineIcons } from '@expo/vector-icons'

export default class Reunioes extends Component {

    state = {
        title: 'Próximas reuniões',
        isLoading: false,
        today: [],
        next: [],
        past: []
    }

    fetchReunioes = async () => {
        const email = await AsyncStorage.getItem('user_email')
        const token = await AsyncStorage.getItem('user_token')

        fetch(`${server}/getReunioes.php`, {
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
            if(data.sucesso) {
                let tempToday = []
                if(data.hoje) {
                    data.hoje.map(reuniao => {
                        tempToday.push({
                            id: reuniao.id,
                            pauta: reuniao.pauta,
                            data: reuniao.hora,
                            confirmado: reuniao.confirmado
                        })
                    })
                }

                let tempNext = []
                if(data.proximas) {
                    data.proximas.map(reuniao => {
                        tempNext.push({
                            id: reuniao.id,
                            pauta: reuniao.pauta,
                            data: reuniao.data,
                            confirmado: reuniao.confirmado
                        })
                    })
                }

                let tempPast = []
                if(data.antigas) {
                    data.antigas.map(reuniao => {
                        tempPast.push({
                            id: reuniao.id,
                            pauta: reuniao.pauta,
                            data: reuniao.data,
                            confirmado: reuniao.confirmado
                        })
                    })
                }

                this.setState({ today: tempToday, next: tempNext, past: tempPast  })
            } else {
                Alert.alert('Falha', 'Ocorreu um erro ao buscar as reuniões')
            }
        }).catch(err => Alert.alert('Falha', 'Ocorreu um problema ao buscar as reuniões'))

        this.setState({ isLoading: false })
    }

    toggleConfirmed = async (id, currentStatus) => {
        this.setState({ isLoading: true })

        const email = await AsyncStorage.getItem('user_email')
        const token = await AsyncStorage.getItem('user_token')
        const confirmed = currentStatus ? 0 : 1

        fetch(`${server}/confirmarPresencaReuniao.php`, {
           method: 'POST',
           headers: {
             Accept: 'application/json',
            'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               email: email,
               token: token,
               id: id,
               confirmado: confirmed
           })
        }).then(async res => {
            const data = await res.json()
            console.log(data)
            if(data.sucesso) {
                this.fetchReunioes()
            } else {
                Alert.alert('Erro', '1- Houve um erro ao alterar sua confirmação')
            }
        }).catch(err => Alert.alert('Erro', err+'2- Houve um erro ao alterar sua confirmação'))

        this.setState({ isLoading: false })
    }

    componentDidMount = () => {
        this.setState({ isLoading: true })
        this.fetchReunioes()
    }

    updateReunioes = () => {
        this.setState({ isLoading: true })
        this.fetchReunioes()
    }

    render() {
        return (
            <View style={commonStyle.container}>
                <Header title={this.state.title} onIconClick={this.props.navigation.openDrawer} />

                <View style={commonStyle.titleContainer}>
                    <Text style={commonStyle.h2Text}>Reuniões</Text>
                    <TouchableHighlight onPress={() => this.updateReunioes()} activeOpacity={0.6} underlayColor={colors.highlight} >
                        <SimpleLineIcons name="refresh" size={25} color="#000000" style={commonStyle.refreshIcon} />
                    </TouchableHighlight>
                </View>

                {this.state.isLoading ? <Loading animate={this.state.isLoading} /> : null }

                <Text style={commonStyle.h3Text}>Hoje</Text>
                <View style={commonStyle.horizontalList}>
                    <FlatList 
                    horizontal={true}
                    data={this.state.today}
                    ItemSeparatorComponent={() => <View style={{margin: 4}} />}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => {
                        return (
                            <ReuniaoCard {...item} onClick={this.toggleConfirmed} />
                        )
                    }} />
                </View>
                {this.state.today.length == 0 ? <Text style={commonStyle.text}>Não há reuniões para hoje</Text> : null}

                <Text style={commonStyle.h3Text}>Próximas</Text>
                <View style={commonStyle.horizontalList}>
                    <FlatList 
                    horizontal={true}
                    data={this.state.next}
                    ItemSeparatorComponent={() => <View style={{margin: 4}} />}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => {
                        return (
                            <ReuniaoCard {...item} onClick={this.toggleConfirmed} />
                        )
                    }} />
                </View>
                {this.state.next.length == 0 ? <Text style={commonStyle.text}>Não há próximas reuniões</Text> : null}

                <Text style={commonStyle.h3Text}>Anteriores</Text>
                <View style={commonStyle.horizontalList}>
                    <FlatList 
                    horizontal={true}
                    data={this.state.past}
                    ItemSeparatorComponent={() => <View style={{margin: 4}} />}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => {
                        return (
                            <ReuniaoCard {...item} onClick={this.toggleConfirmed} />
                        )
                    }} />
                </View>
                {this.state.past.length == 0 ? <Text style={commonStyle.text}>Não há reuniões anteriores</Text> : null}
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10
    }
})
