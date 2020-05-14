import React, { Component } from 'react'
import { 
    View, 
    Text,
    FlatList,
    RefreshControl,
    TouchableHighlight } from 'react-native'

import { commonStyle, colors } from '../../commonStyle'
import Header from '../../components/Header'
import Loading from '../../components/Loading'
import Ponto from '../../components/Ponto/Ponto'

import { AsyncStorage } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'

import { server, showError } from '../../functions'

export default class Historico extends Component {

    state = {
        title: 'Histórico de pontos',
        pontos: [],
        isLoading: true,
        refreshing: false
    }

    fetchHistory = async () => {
       const token = await AsyncStorage.getItem('user_token')
       const email = await AsyncStorage.getItem('user_email')

       await fetch(`${server}/historicoPonto.php`, {
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
                const tempPontos = []
                data.map(ponto => {
                    tempPontos.push({
                        id: Math.random(),
                        data: ponto.data,
                        entrada: ponto.entrada,
                        entrada_endereco: ponto.entrada_endereco,
                        pausa: ponto.pausa,
                        pausa_endereco: ponto.pausa_endereco,
                        retorno: ponto.retorno,
                        retorno_endereco: ponto.retorno_endereco,
                        saida: ponto.saida,
                        saida_endereco: ponto.saida_endereco,
                        anotacoes: ponto.anotacao
                    })
                })
                this.setState({ pontos: tempPontos, isLoading: false })
           } else {
               showError('Houve um problema ao encontrar seu histórico de pontos eletrônicos')
           }
       })
       .catch(err => showError('Houve um problema ao buscar seu histórico de pontos eletrônicos'))
    }

    updateHistory = () => {
        this.setState({ isLoading: true })
        this.fetchHistory()
    }
    
    componentDidMount = () => {
       this.fetchHistory()
    }

    onRefresh = () => {
        this.setState({ refreshing: true })
        this.fetchHistory()
        this.setState({ refreshing: false })
    }

    render() {
        return (
            <View style={commonStyle.container}>
                <Header title={this.state.title} onIconClick={this.props.navigation.openDrawer} />

                <View style={commonStyle.titleContainer}>
                    <Text style={commonStyle.h2Text}>Últimos 60 dias</Text>
                    <TouchableHighlight onPress={() => this.updateHistory()} activeOpacity={0.6} underlayColor={colors.highlight} >
                        <SimpleLineIcons name="refresh" size={25} color="#000000" style={commonStyle.refreshIcon} />
                    </TouchableHighlight>
                </View>

                {this.state.isLoading ? <Loading animate={this.state.isLoading} /> : null }

                <FlatList style={commonStyle.scrollContainer} 
                refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} colors={[colors.primary]} />}
                data={this.state.pontos}
                keyExtractor={item => item.id.toString()}
                renderItem={ ({ item }) => {
                    return ( 
                        <Ponto {...item} />
                    )
                }} >
                </FlatList>
            </View>
        )
    }
}