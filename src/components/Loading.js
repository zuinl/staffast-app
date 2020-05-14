import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

import { colors } from '../commonStyle'

export default class Loading extends Component {
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color={this.props.color ? this.props.color : colors.primary} animating={this.props.animate} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    margin: 15
  },
})