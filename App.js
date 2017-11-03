import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage
} from 'react-native';

import Login from './src/component/Login/Login';
import Main from './src/component/Main';
import Loading from './src/common/Loading/Loading';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isLogin: false
    };
  }

  componentWillMount() {
    try {
      AsyncStorage.getItem('userToken').then((data) => {
        this.setState({
          isLoaded: true,
          isLogin: !!data
        });
      });
    } catch (error) {
      // Error saving data
    }
  }

  successLogin = (userName) => {
    try {
      AsyncStorage.setItem('userToken', userName).then(() => {
        this.setState({
          isLoaded: true,
          isLogin: true
        });
      });
    } catch (error) {
      // Error saving data
    }
  };
  logout = () => {
    this.setState({
      isLoaded: true,
      isLogin: false
    })
  };

  render() {
    const {isLoaded, isLogin} = this.state;
    if (!isLoaded) {
      return (
        <View style={styles.container}>
          <Loading/>
        </View>
      )
    } else {
      if (isLogin) {
        return <Main logout={this.logout}/>
      } else {
        return <Login successLogin={this.successLogin}/>
      }
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