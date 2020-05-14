import React from 'react'
import { 
    View, 
    Text,
    TouchableHighlight } from 'react-native'

import { commonStyle, colors } from '../../commonStyle'

export default props => {
    return (
        <View style={commonStyle.horizontalCard}>
            <View style={commonStyle.horizontalCardTopContent}>
                <Text style={commonStyle.horizontalCardTitle}>{props.data}</Text>
                <Text style={commonStyle.horizontalCardText}>{props.pauta}</Text>
            </View>
            <View style={commonStyle.horizontalCardBottomContent}>
                <TouchableHighlight style={commonStyle.button2} 
                    onPress={() => props.onClick(props.id, props.confirmado)}
                    activeOpacity={0.6}
                    underlayColor={colors.secundary} >
                        <Text style={commonStyle.buttonText}>{props.confirmado ? 'Não irei mais' : 'Confirme presença' }</Text>
                </TouchableHighlight>
            </View>
        </View>   
    )
}
