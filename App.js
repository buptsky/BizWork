import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Main from './src/component/Main';
import Login from './src/component/Login';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    };
  }
  componentWillMount() {
    try {
      //const token = await AsyncStorage.getItem('loginToken');
      /*this.setState({
        isLogin: !!token
      });*/
    } catch (error) {
      // Error saving data
    }
  }
  handleLogin = () => {
    try {
      //const token = await AsyncStorage.setItem('loginToken','test');
      this.setState({
        isLogin: !this.state.isLogin
      });
    } catch (error) {
      // Error saving data
    }
  };
  render() {
    const {isLogin} = this.state;
    return (
      <Main/>
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