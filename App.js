import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  NetInfo
} from 'react-native';
import fetchData from './src/util/fetchData';
import Login from './src/component/Login/Login';
import Main from './src/component/Main';
import Loading from './src/common/Loading/Loading';
import servers from './src/util/servers';

let allUsers = [];
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isLogin: false,
      infoStr: ''
    };
  }

  componentDidMount() {
    //空接口，提示用户开启数据访问权限
    fetchData({url: servers.FaceScan + '/tst.do'});
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange
    );
  }

  handleConnectivityChange = (isConnected) => {
    if (!isConnected) {
      this.setState({
        infoStr: '网络故障'
      });
    } else {
      fetchData({url: servers.BizTaskDev + '/user/getAll.do'}).then((data) => {
        console.log(data);
        allUsers = data;  //不往storage中存是因为数据太大，红屏了
        //根据token判断登录状态
        AsyncStorage.getItem('userToken').then((data) => {
          this.setState({
            isLoaded: true,
            isLogin: !!data
          });
        });
      });
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
    const {isLoaded, isLogin, infoStr} = this.state;
    if (!isLoaded) {
      return (
        <View style={styles.container}>
          <Text>{infoStr}</Text>
          <Loading/>
        </View>
      )
    } else {
      if (isLogin) {
        return <Main screenProps={{logout: this.logout, allUsers: allUsers}}/>
      } else {
        return <Login successLogin={this.successLogin} allUsers={allUsers}/>
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