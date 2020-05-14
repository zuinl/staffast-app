import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableHighlight,
    StatusBar,
    Platform,
    StyleSheet
} from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'

export default class Header extends Component {
    render() {
        return (
            <View style={styles.headerContainer}>
                <StatusBar backgroundColor="#13a378" barStyle="light-content" />
                {!this.props.login && 
                    <View style={styles.icon}>
                        <TouchableHighlight 
                        activeOpacity={0.6}
                        underlayColor="#13a378" 
                        onPress={this.props.onIconClick}>
                            <SimpleLineIcons name="menu" size={25} color='#FFFFFF' />
                        </TouchableHighlight>
                    </View>
                }
                <View style={styles.iconContainer}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 5,
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        padding: 15,
        backgroundColor: '#13a378'
    },
    title: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold'
    },
    icon: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: 25
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})