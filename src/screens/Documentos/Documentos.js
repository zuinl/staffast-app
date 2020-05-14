import React, { Component } from 'react'
import { 
    View, 
    Text,
    FlatList,
    RefreshControl,
    TouchableHighlight } from 'react-native'
import { AsyncStorage } from 'react-native'

import { commonStyle, colors } from '../../commonStyle'
import { server, showError } from '../../functions'
import Header from '../../components/Header'
import Loading from '../../components/Loading'
import Documento from '../../components/Documentos/Documento'

import { SimpleLineIcons } from '@expo/vector-icons'

export default class Documentos extends Component {

    state = {
        title: 'Seus documentos',
        isLoading: true,
        refreshing: false,
        docs: []
    }

    fetchDocs = async () => {
        const email = await AsyncStorage.getItem('user_email')
        const token = await AsyncStorage.getItem('user_token')

        await fetch(`${server}/documento.php`, {
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

            if(!data.sucesso) {
                showError('Houve um erro ao buscar seus documentos')
            }

            let docs = []
            data.map(doc => {
                docs.push({
                    id: Math.random(),
                    titulo: doc.titulo,
                    remetente: doc.remetente,
                    data: doc.data,
                    tipo: doc.tipo,
                    link: doc.link
                })
            })

            this.setState({ docs, isLoading: false })
        }).catch(err => showError('Houve um erro ao buscar seus documentos'))
    }

    componentDidMount = async () => {
        this.fetchDocs()
    }

    onRefresh = () => {
        this.setState({ refreshing: true })
        this.fetchDocs()
        this.setState({ refreshing: false })
    }

    updateDocs = () => {
        this.setState({ isLoading: true })
        this.fetchDocs()
    }

    render() {
        return (
            <View style={commonStyle.container}>
                <Header title={this.state.title} onIconClick={this.props.navigation.openDrawer} />

                <View style={commonStyle.titleContainer}>
                    <Text style={commonStyle.h2Text}>Documentos</Text>
                    <TouchableHighlight onPress={() => this.updateDocs()} activeOpacity={0.6} underlayColor={colors.highlight} >
                        <SimpleLineIcons name="refresh" size={25} color="#000000" style={commonStyle.refreshIcon} />
                    </TouchableHighlight>
                </View>

                {this.state.isLoading ? <Loading animate={this.state.isLoading} /> : null }

                <FlatList style={commonStyle.scrollContainer} 
                 refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} colors={[colors.primary]} />}
                 data={this.state.docs}
                 keyExtractor={item => item.id.toString()}
                 renderItem={({ item }) => {
                     return (
                        <Documento {...item} />
                     )
                 }} >
                </FlatList>
            </View>
        )
    }
}
