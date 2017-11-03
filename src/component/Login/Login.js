import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class FaceScan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      passWord: ''
    }
  }

  confirmLogin = () => {
    const {userName, passWord} = this.state;
    if (!userName) {
      return;
    }
    this.props.successLogin(userName);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoview}>
          <Image source={require('./biz-logo.png')} style={styles.avatarimage}/>
        </View>
        <View style={styles.infoview}>
          <View style={styles.inputview}>
            <TextInput
              underlineColorAndroid='transparent'
              style={styles.textinput}
              onChangeText={(text) => this.setState({userName: text})}
              value={this.state.userName}
              placeholder='用户名'
              selectionColor='#1DBAF1'
            />
          </View>
          <View style={styles.inputview}>
            <TextInput
              underlineColorAndroid='transparent'
              style={styles.textinput}
              onChangeText={(text) => this.setState({passWord: text})}
              value={this.state.passWord}
              placeholder='密码'
              selectionColor='#1DBAF1'
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={styles.bottomview}>
          <TouchableOpacity onPress={this.confirmLogin}>
            <View style={styles.loginview}>
              <Text style={styles.logintext}>登录</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10
  },
  logoview: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarimage: {
    flex: 0.8,
    resizeMode: 'contain'
  },
  infoview: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputview: {
    borderBottomColor: '#1DBAF1',
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 10
  },
  textinput: {
    flex: 1,
    fontSize: 16,
    color: '#1DBAF1'
  },
  bottomview: {
    backgroundColor: '#fff',
    marginTop: 20,
    flex: 1,
  },
  loginview: {
    backgroundColor: '#1DBAF1',
    margin: 10,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 40
  },
  logintext: {
    fontSize: 18,
    color: '#fff'
  }
});
