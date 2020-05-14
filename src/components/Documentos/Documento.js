import React from 'react'
import { 
    View, 
    Text,
    Linking,
    TouchableHighlight,
    StyleSheet } from 'react-native'

import { commonStyle, colors } from '../../commonStyle'

import { AntDesign } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

export default props => {
    return (
        <View style={commonStyle.cardContainer}>
            <Text style={[commonStyle.text, styles.cardTitle]}>{props.titulo} - {props.remetente}</Text>

            <View style={styles.detailsContainer}>
                <Text style={commonStyle.text}>{props.tipo}</Text>
                <Text style={commonStyle.text}>{props.data}</Text>
            </View>

            <View style={styles.detailsContainer}>
                <TouchableHighlight onPress={() => Linking.openURL(props.link) } 
                    activeOpacity={0.6}
                    underlayColor={colors.highlight} >
                    <AntDesign name="download" size={28} color={colors.primary} />
                </TouchableHighlight>

                <TouchableHighlight onPress={() => Linking.openURL(props.link)}
                    activeOpacity={0.6}
                    underlayColor={colors.highlight} >
                    <Entypo name="google-drive" size={28} color={colors.primary} />
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 15
    }
})
