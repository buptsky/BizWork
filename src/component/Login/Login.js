import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';

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
      <Image source={require('./bg.jpg')} style={styles.backgroundImage} >
        <View style={styles.container}>

          <View style={styles.logoview}>
            <Image source={require('./logo.png')} style={styles.avatarimage}/>
          </View>
          <View style={{height: 130, justifyContent: 'center'}}>
            <Hideo
              iconClass={FontAwesomeIcon}
              iconName={'user'}
              iconColor={'white'}
              iconBackgroundColor={'#108ee9'}
              inputStyle={{ color: '#464949' }}
              placeholder='用户名'
              onChangeText={(text) => this.setState({userName: text})}
              value={this.state.userName}
              style={{height: 60}}
            />
            <Hideo
              iconClass={FontAwesomeIcon}
              iconName={'lock'}
              iconColor={'white'}
              iconBackgroundColor={'#108ee9'}
              inputStyle={{ color: '#464949' }}
              placeholder='密码'
              value={this.state.passWord}
              onChangeText={(text) => this.setState({passWord: text})}
              selectionColor='#1DBAF1'
              secureTextEntry={true}
              style={{height: 60}}
            />
            {/*<View style={styles.inputview}>*/}
            {/*<TextInput*/}
            {/*underlineColorAndroid='transparent'*/}
            {/*style={styles.textinput}*/}
            {/*onChangeText={(text) => this.setState({userName: text})}*/}
            {/*value={this.state.userName}*/}
            {/*placeholder='用户名'*/}
            {/*selectionColor='#1DBAF1'*/}
            {/*/>*/}
            {/*</View>*/}
            {/*<View style={styles.inputview}>*/}
            {/*<TextInput*/}
            {/*underlineColorAndroid='transparent'*/}
            {/*style={styles.textinput}*/}
            {/*onChangeText={(text) => this.setState({passWord: text})}*/}
            {/*value={this.state.passWord}*/}
            {/*placeholder='密码'*/}
            {/*selectionColor='#1DBAF1'*/}
            {/*secureTextEntry={true}*/}
            {/*/>*/}
            {/*</View>*/}
          </View>

          <View style={styles.bottomview}>
            <TouchableOpacity onPress={this.confirmLogin}>
              <View style={styles.loginview}>
                <Text style={styles.logintext}>登录</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Image>

    );
  }
}

const styles = StyleSheet.create({
  backgroundImage:{
    // flex:1,
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'row',
    // width:null,
    width: Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    //不加这句，就是按照屏幕高度自适应
    //加上这几，就是按照屏幕自适应
    // resizeMode:Image.resizeMode.contain,
    //祛除内部元素的白色背景
    backgroundColor:'rgba(0,0,0,0)',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingLeft: 10,
    paddingRight: 10
  },
  logoview: {
    // flex: 1,
    height: Dimensions.get('window').height * 0.3,
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
    backgroundColor: 'transparent',
    marginTop: 20,
    flex: 1,
  },
  loginview: {
    backgroundColor: '#108ee9',
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
