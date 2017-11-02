import React, {Component} from 'react';
import {
  StyleSheet,
  AsyncStorage
} from 'react-native';

import Login from './src/component/Login/Login';
import Main from './src/component/Main';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    };
  }

  componentWillMount() {
    try {
      AsyncStorage.getItem('loginToken').then((data) => {
        this.setState({
          isLogin: !!data
        });
      });
    } catch (error) {
      // Error saving data
    }
  }

  handleLogin = () => {
    try {
      AsyncStorage.setItem('loginToken', 'mockToken').then(() => {
        this.setState({
          isLogin: true
        });
      });
    } catch (error) {
      // Error saving data
    }
  };

  render() {
    const {isLogin} = this.state;
    if (isLogin) {
      return <Main/>
    } else {
      return <Login login={this.handleLogin}/>
    }
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