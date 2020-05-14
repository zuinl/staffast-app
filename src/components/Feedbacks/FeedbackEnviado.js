import React from 'react'
import { 
    View, 
    Text,
    StyleSheet } from 'react-native'

import { commonStyle } from '../../commonStyle'

export default props => {
    return (
        <View style={commonStyle.cardContainer}>
            <Text style={[commonStyle.text, styles.cardTitle]}>Enviado para {props.destinatario} em {props.data}</Text>

            <View style={styles.detailsContainer}>
                <Text style={commonStyle.text}>Feedback: {props.texto}</Text>
            </View>

            {props.comecar ? 
                <View style={styles.detailsContainer}>
                    <Text style={commonStyle.text}>Comece a fazer: {props.comecar}</Text>
                </View>
            : null }

            {props.continuar ? 
                <View style={styles.detailsContainer}>
                    <Text style={commonStyle.text}>Continue a fazer: {props.continuar}</Text>
                </View>
            : null}

            {props.parar ? 
                <View style={styles.detailsContainer}>
                    <Text style={commonStyle.text}>Pare de fazer: {props.parar}</Text>
                </View>
            : null}
        </View>
    )
}

const styles = StyleSheet.create({
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 15
    }
})