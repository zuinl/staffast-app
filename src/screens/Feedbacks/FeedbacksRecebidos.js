import React, { Component } from 'react'
import { 
    View, 
    Text,
    TouchableHighlight,
    RefreshControl,
    FlatList } 
    from 'react-native'

import { commonStyle, colors } from '../../commonStyle'
import Header from '../../components/Header'
import Loading from '../../components/Loading'
import FeedbackRecebido from '../../components/Feedbacks/FeedbackRecebido'

import { server, showError } from '../../functions'
import { AsyncStorage } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'

export default class FeedbacksRecebidos extends Component {

    state = {
        title: 'Feedbacks recebidos',
        isLoading: true,
        refreshing: false,
        feedbacks: []
    }

    componentDidMount = () => {
        this.fetchFeedbacks()
    }

    fetchFeedbacks = async () => {
        const email = await AsyncStorage.getItem('user_email')
        const token = await AsyncStorage.getItem('user_token')

        await fetch(`${server}/feedbacksRecebidos.php`, {
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
                let feedbacks = []
                data.map(feedback => {
                    feedbacks.push({
                        id: feedback.id,
                        data: feedback.data,
                        texto: feedback.texto,
                        comecar: feedback.comecar,
                        continuar: feedback.continuar,
                        parar: feedback.parar,
                        remetente: feedback.remetente
                    })
                })

                this.setState({ isLoading: false, feedbacks })
            }
        }).catch(err => showError('Houve um erro ao buscar seus feedbacks'))
    }

    updateFeedbacks = () => {
        this.setState({ isLoading: true })
        this.fetchFeedbacks()
    }

    onRefresh = () => {
        this.setState({ refreshing: true })
        this.fetchFeedbacks()
        this.setState({ refreshing: false })
    }

    render() {
        return (
            <View style={commonStyle.container}>
                <Header title={this.state.title} onIconClick={this.props.navigation.openDrawer} />

                <View style={commonStyle.titleContainer}>
                    <Text style={commonStyle.h2Text}>Enviados para você</Text>
                    <TouchableHighlight onPress={() => this.updateFeedbacks()} activeOpacity={0.6} underlayColor={colors.highlight} >
                        <SimpleLineIcons name="refresh" size={25} color="#000000" style={commonStyle.refreshIcon} />
                    </TouchableHighlight>
                </View>

                {this.state.isLoading ? <Loading animate={this.state.isLoading} /> : null }

                <FlatList 
                 style={commonStyle.scrollContainer} 
                 refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} colors={[colors.primary]} />}
                 data={this.state.feedbacks}
                 keyExtractor={item => item.id.toString()}
                 renderItem={({ item }) => {
                     return (
                        <FeedbackRecebido {...item} />
                     )
                 }} >
                </FlatList>
            </View>
        )
    }
}