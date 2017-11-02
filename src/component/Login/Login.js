import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
export default class Login extends Component {
  constructor(props) {
    super(props);
  }
  onPressButton = () => {
    this.props.login();
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>login screen</Text>
        <TouchableHighlight onPress={this.onPressButton}>
          <Text>do login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
