import React, { Component } from 'react'
import { 
    View, 
    Text,
    TouchableHighlight,
    RefreshControl,
    FlatList } from 'react-native'
import { connect } from 'react-redux'
import { getSentFeedbacks } from '../../actions/Feedbacks'

import { commonStyle, colors } from '../../commonStyle'
import Header from '../../components/Header'
import Loading from '../../components/Loading'
import FeedbackEnviado from '../../components/Feedbacks/FeedbackEnviado'

import { AsyncStorage } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'

class FeedbacksEnviados extends Component {

    state = {
        title: 'Feedbacks enviados',
        isLoading: true,
        refreshing: false
    }

    loadFeedbacks = async () => {
        const email = await AsyncStorage.getItem('user_email')
        const token = await AsyncStorage.getItem('user_token')
        const user = {
            email, 
            token
        }
        await this.props.getSentFeedbacks(user)
        this.setState({ isLoading: false })
    }

    componentDidMount = () => {
        this.loadFeedbacks()
    }

    updateFeedbacks = () => {
        this.setState({ isLoading: true })
        this.loadFeedbacks()
    }

    onRefresh = () => {
        this.setState({ refreshing: true })
        this.loadFeedbacks()
        this.setState({ refreshing: false })
    }

    render() {
        return (
            <View style={commonStyle.container}>
                <Header title={this.state.title} onIconClick={this.props.navigation.openDrawer} />

                <View style={commonStyle.titleContainer}>
                    <Text style={commonStyle.h2Text}>Enviados por você</Text>
                    <TouchableHighlight onPress={() => this.updateFeedbacks()} activeOpacity={0.6} underlayColor={colors.highlight} >
                        <SimpleLineIcons name="refresh" size={25} color="#000000" style={commonStyle.refreshIcon} />
                    </TouchableHighlight>
                </View>

                {this.state.isLoading ? <Loading animate={this.state.isLoading} /> : null }

                <FlatList 
                 style={commonStyle.scrollContainer} 
                 refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} colors={[colors.primary]} />}
                 data={this.props.feedbacks}
                 keyExtractor={item => item.id.toString()}
                 renderItem={({ item }) => {
                     return (
                        <FeedbackEnviado {...item} />
                     )
                 }} >
                </FlatList>
            </View>
        )
    }
}

const mapStateToProps = ({ feedback }) => { //nome do reducer, que é objeto do state geral
    return {
        feedbacks: feedback.sentFeedbacks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSentFeedbacks: user => dispatch(getSentFeedbacks(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbacksEnviados)