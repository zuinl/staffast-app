import { StyleSheet, Dimensions } from 'react-native'

const colors = {
    primary: '#13a378',
    secundary: '#1386A3',
    highlight: '#d6d0d0'
}

const commonStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    cardContainer: {
        width: '95%',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#ebe6e6'
    },
    scrollContainer: {
        width: '100%',
        marginTop: 10
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button1: {
        backgroundColor: '#13a378',
        margin: 10,
        padding: 10,
        borderRadius: 10
    },
    button2: {
        backgroundColor: '#1386A3',
        margin: 10,
        padding: 10,
        borderRadius: 10
    },
    input: {
        width: '90%',
        margin: 5,
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#ededed'
    },
    h1Text: {
        color: '#13A330',
        fontSize: 30,
        fontWeight: 'bold',
        margin: 2
    },
    h2Text: {
        color: '#13A330',
        fontSize: 25,
        fontWeight: 'bold',
        margin: 2
    },
    h3Text: {
        color: '#13A330',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 2
    },
    buttonText: {
        color: '#FFFFFF'
    },  
    text: {
        color: '#000000',
        margin: 2
    },
    bold: {
        fontWeight: 'bold'
    },
    refreshIcon: {
        marginLeft: 10,
        marginTop: 5
    },
    horizontalList: {
        width: '98%',
        marginTop: 5,
        marginBottom: 5
    },
    horizontalCard: {
        padding: 10,
        backgroundColor: colors.primary,
        height: Dimensions.get('screen').height / 10 * 3,
        width: Dimensions.get('screen').width / 10 * 5
    },
    horizontalCardTopContent: {
        width: '100%',
        height: '75%',
        marginBottom: 5 
    },
    horizontalCardBottomContent: {
        width: '100%',
        height: '25%'
    },
    horizontalCardTitle: {
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontSize: 16
    },
    horizontalCardText: {
        color: '#FFFFFF',
        fontSize: 14
    }
})

export { commonStyle, colors }