import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator
} from 'react-native'

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color={indicatorColor}/>
        <Text style={styles.content}>为您加载</Text>
      </View>
    )
  }
}

const indicatorColor = '#039be5';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: (Platform.OS === 'ios') ? 50 : 100
  },
  content: {
    marginLeft: (Platform.OS === 'ios') ? 10 : 0,
    marginTop: (Platform.OS === 'ios') ? 0 : 10,
    color: '#b5b5b5',
  },
});
