import React, { Component } from 'react'
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet
} from 'react-native'

export default class WorkFlowItem extends Component {
  render() {
    const {rowData} = this.props;
    return (
      <View style={styles.row}>
        <Text>{rowData}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

});
