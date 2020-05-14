import React, { Component } from 'react'
import { 
    View, 
    Text,
    StyleSheet } from 'react-native'

import { commonStyle } from '../../commonStyle'

export default props => {
    return (
        <View style={commonStyle.cardContainer}>
            <Text style={[commonStyle.text, styles.cardTitle]}>{props.data}</Text>

            <View style={styles.shiftContainer}>
                <View style={styles.timeContainer}>
                    <Text style={[commonStyle.text, commonStyle.bold]}>Entrada:</Text>
                    <Text style={commonStyle.text}>{props.entrada}</Text>
                </View>
                <View style={styles.timeContainer}>
                    <Text style={[commonStyle.text, commonStyle.bold]}>Endereço:</Text>
                    <Text style={commonStyle.text}>{props.entrada_endereco}</Text>
                </View>
            </View>
            <View style={styles.shiftContainer}>
                <View style={styles.timeContainer}>
                    <Text style={[commonStyle.text, commonStyle.bold]}>Pausa:</Text>
                    <Text style={commonStyle.text}>{props.pausa}</Text>
                </View>
                <View style={styles.timeContainer}>
                    <Text style={[commonStyle.text, commonStyle.bold]}>Endereço:</Text>
                    <Text style={commonStyle.text}>{props.pausa_endereco}</Text>
                </View>
            </View>
            <View style={styles.shiftContainer}>
                <View style={styles.timeContainer}>
                    <Text style={[commonStyle.text, commonStyle.bold]}>Retorno:</Text>
                    <Text style={commonStyle.text}>{props.retorno}</Text>
                </View>
                <View style={styles.timeContainer}>
                    <Text style={[commonStyle.text, commonStyle.bold]}>Endereço:</Text>
                    <Text style={commonStyle.text}>{props.retorno_endereco}</Text>
                </View>
            </View>

            <View style={styles.shiftContainer}>
                <View style={styles.timeContainer}>
                    <Text style={[commonStyle.text, commonStyle.bold]}>Saída:</Text>
                    <Text style={commonStyle.text}>{props.saida}</Text>
                </View>
                <View style={styles.timeContainer}>
                    <Text style={[commonStyle.text, commonStyle.bold]}>Endereço:</Text>
                    <Text style={commonStyle.text}>{props.saida_endereco}</Text>
                </View>
            </View>
            <View style={styles.shiftContainer}>
                <View style={styles.timeContainer}>
                    <Text style={[commonStyle.text, commonStyle.bold]}>Anotações:</Text>
                    <Text style={commonStyle.text}>{props.anotacoes}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    shiftContainer: {
        marginTop: 10
    },
    timeContainer: {
        flexDirection: 'row'
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 15
    }
})