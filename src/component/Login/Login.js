import React, {Component} from 'react';
import BizWorkAlert from '../../common/BizWorkAlert';
import {
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Hideo} from 'react-native-textinput-effects';

export default class FaceScan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      passWord: ''
    }
  }

  confirmLogin = () => {
    let {userName, passWord} = this.state;
    const {allUsers} = this.props;
    userName = userName.toLowerCase();
    const loginUser = allUsers.find((user) => {
      return user.name == userName || `${user.name}@sogou-inc.com` == userName;
    });
    if (!loginUser) {
      BizWorkAlert.alert('请输入自己的搜狗邮箱账号');
      return false;
    }
    this.props.successLogin(userName);
  };

  render() {
    return (
      <ImageBackground source={require('./bg1.jpg')} style={styles.backgroundImage}>
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
              inputStyle={{color: '#464949'}}
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
              inputStyle={{color: '#464949'}}
              placeholder='密码'
              value={this.state.passWord}
              onChangeText={(text) => this.setState({passWord: text})}
              selectionColor='#1DBAF1'
              secureTextEntry={true}
              style={{height: 60}}
            />
          </View>

          <View style={styles.bottomview}>
            <TouchableOpacity onPress={this.confirmLogin}>
              <View style={styles.loginview}>
                <Text style={styles.logintext}>登录</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    // flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // width:null,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    //不加这句，就是按照屏幕高度自适应
    //加上这几，就是按照屏幕自适应
    // resizeMode:Image.resizeMode.contain,
    //祛除内部元素的白色背景
    backgroundColor: 'rgba(0,0,0,0)',
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
