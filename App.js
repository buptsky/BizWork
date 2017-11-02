import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import FaceScan from './src/component/BizLab/FaceScan';

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
      <View style={styles.container}>
        <FaceScan/>
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