import React, {Component} from 'react';
import {View, Text, StyleSheet, AsyncStorage, Button} from 'react-native';

export default class Mine extends Component {
  logout = () => {
    AsyncStorage.clear();
    this.props.screenProps();
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.logout}
                title='登出'
                color='#039be5'/>
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