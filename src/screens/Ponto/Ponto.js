import React, { Component } from 'react'
import { 
    View, 
    Text,
    TouchableHighlight, 
    ScrollView,
    Dimensions,
    Image,
    Alert,
    StyleSheet } from 'react-native'

import { commonStyle, colors } from '../../commonStyle'
import Header from '../../components/Header'
import BaterPonto from './BaterPonto'

export default class Ponto extends Component {

    state = {
        title: 'Ponto eletrônico',
        isAdding: false,
        pontoType: '',
        pontoTitle: ''
    }

    registrarPonto = pontoType => {
        let pontoTitle = ''
        switch(pontoType) {
            case 1: pontoTitle = 'Entrada' 
                break
            case 2: pontoTitle = 'Pausa'
                break
            case 3: pontoTitle = 'Retorno'
                break
            case 4: pontoTitle = 'Saída'
                break
        }
        this.setState({ pontoType, pontoTitle, isAdding: true })
    }

    onBaterCancel = () => this.setState({ isAdding: false })

    render() {
        return (
            <View style={commonStyle.container}>
                <BaterPonto isVisible={this.state.isAdding} onCancel={this.onBaterCancel} title={this.state.pontoTitle} pontoType={this.state.pontoType} />

                <Header title={this.state.title} onIconClick={this.props.navigation.openDrawer} />

                <Text style={commonStyle.h2Text}>Selecione uma opção</Text>

                <ScrollView style={commonStyle.scrollContainer}>
                    <TouchableHighlight onPress={() => this.registrarPonto(1)} 
                     activeOpacity={0.6}
                     underlayColor={colors.highlight} >
                        <View style={styles.imageContainer}>
                            <Image source={require('../../../assets/icons/entrance.png')} style={styles.image} />
                            <Text style={[commonStyle.text, { fontWeight: 'bold' }]}>ENTRADA</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this.registrarPonto(2)} 
                     activeOpacity={0.6}
                     underlayColor={colors.highlight} >
                        <View style={styles.imageContainer}>
                            <Image source={require('../../../assets/icons/fruits.png')} style={styles.image} />
                            <Text style={[commonStyle.text, { fontWeight: 'bold' }]}>PAUSA</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this.registrarPonto(3)} 
                     activeOpacity={0.6}
                     underlayColor={colors.highlight} >
                        <View style={styles.imageContainer}>
                            <Image source={require('../../../assets/icons/time.png')} style={styles.image} />
                            <Text style={[commonStyle.text, { fontWeight: 'bold' }]}>RETORNO</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this.registrarPonto(4)} 
                     activeOpacity={0.6}
                     underlayColor={colors.highlight} >
                        <View style={styles.imageContainer}>
                            <Image source={require('../../../assets/icons/exit.png')} style={styles.image} />
                            <Text style={[commonStyle.text, { fontWeight: 'bold' }]}>SAÍDA</Text>
                        </View>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('window').width / 5 * 1,
        height: Dimensions.get('window').width / 5 * 1,
        margin: 5
    },
    imageContainer: {
        alignItems: 'center',
        margin: 5,
        padding: 10
    }
})