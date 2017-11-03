import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage
} from 'react-native';

import Login from './src/component/Login/Login';
import Main from './src/component/Main';
import Loading from './src/common/loading/Loading';

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

  render() {
    const {isLoaded,isLogin} = this.state;
    if (!isLoaded) {
      return (
        <View style={styles.loadingContainer}>
          <Loading/>
        </View>
      )
    } else {
      if (isLogin) {
        return <Main/>
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