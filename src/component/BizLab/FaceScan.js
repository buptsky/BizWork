import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import Camera from 'react-native-camera';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Screen from '../../common/screen';


export default class FaceScan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translateValue: new Animated.ValueXY({x: 0, y: 0}), // 二维坐标
      modalVisible: false, // 采集/检测识别成功弹窗
      startScan: false, // 采集/验证状态
      status: 'scan', // 判断是采集还是验证
      userName: '' // 识别出的用户信息
    };
  }

  componentWillUnmount() {
    console.log('unmount');
  }
  
  // 点击进行扫描
  startScan = () => {
    console.log('start scan');
    this.startAnimate = true;
    this.startAnimation(); // 开启动画效果
    this.setState({startScan: true});
    this.successNum = 0; // 用于记录采集合格数量
    // 测试程序，假设一段时间后自动成功
    // this.test = setTimeout(() => {
    //   this.setState({modalVisible: true});
    // }, 4000);
    // this.timer = setInterval(() => {
    //   this.takePicture();
    // }, 2000);
    this.takePicture();
  }
  // 取消扫描
  cancelScan = () => {
    // 取消动画效果
    this.resetAnimation();
    this.setState({startScan: false});
  }
  // 扫描成功
  successScan = (userName) => {
    this.resetAnimation();
    this.setState({
      startScan: false,
      modalVisible: true,
      userName: userName ? userName : ''
    });
  }
  // 扫描效果动画
  startAnimation = () => {
    this.state.translateValue.setValue({x: 0, y: 0});
    Animated.timing(
      this.state.translateValue,
      {
        toValue: {x: 0, y: (Dimensions.get('window').height - 70) * 0.75},
        duration: 2000
      }
    ).start(() => {
      this.startAnimate && this.startAnimation();
    });
  }
  // 终止动画
  resetAnimation = () => {
    this.startAnimate = false;
    this.state.translateValue.setValue({x: 0, y: 0});
  }

  takePicture = () => {
    console.log('once');
    const status = this.state.status;
    const options = {};
    this.camera.capture({metadata: options})
      .then((data) => {
        // 处理系统兼容
        // substring(7) -> to remove the file://
        let path = Platform.OS === 'android' ? data.path.substring(7) : data.path;
        RNFS.readFile(path, "base64").then(res => {
          // console.log(res);
          const url = status === 'login' ?
            'http://10.129.148.81:8585/verifyFace.do' :
            'http://10.129.148.81:8585/addFace.do';
          // 发送请求
          fetch(url, {
            method: 'POST',
            // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            // body: `data=${encodeURIComponent(res)}&id=zhaiyibo`
            body: JSON.stringify({
              data: encodeURIComponent(res),
              id: 123123
            })
          }).then(res => res.json())
            .then(data => {
              // 有返回再发下一次请求
              console.log(data);
              // 扫描判断条件，成功采集三次返回
              if (this.state.status === 'scan' && data.status) {
                this.successNum++;
                if (this.successNum === 3) {
                  this.successScan();
                  return;
                }
              } else if (this.state.status === 'login' && data.status) {
                console.log('return');
                // 得到最终验证结果
                if (!data.username) { // 验证失败
                } else {
                  this.successScan(data.username);
                  return;
                }
              }
              this.takePicture();
            }).catch(err => console.log(err));
          // 传送图片后删除
          RNFS.unlink(path).then(() => {
            console.log('FILE DELETED');
          }).catch(err => console.error(err));
        }).catch(err => console.error(err));
      }).catch(err => console.error(err));
  }

  closeModal = () => {
    this.setState({
      modalVisible: false,
      status: 'login'
    });
  }

  render() {
    const isStart = this.state.startScan;
    const status = this.state.status;
    return (
      <View style={styles.scanContainer}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          type={'front'}
          style={styles.cameraView}
          aspect={Camera.constants.Aspect.fill}
          playSoundOnCapture={false}
          captureQuality={'photo'}
          captureTarget={Camera.constants.CaptureTarget.disk}
        >
          <View style={styles.scanView}>
            <Animated.View style={{
              flex: 1,
              height: 1,
              transform: [
                {translateY: this.state.translateValue.y} // y轴移动
              ],
              backgroundColor: '#1DBAF1'
            }}>
            </Animated.View>
          </View>
          <View style={styles.operateView}>
            <TouchableOpacity onPress={isStart ? this.cancelScan :  this.startScan}>
              <Icon name={isStart ? 'hourglass' : 'camera-retro'} size={72} color="#1DBAF1"/>
            </TouchableOpacity>
            {
              status === 'login' ? (
                <Text style={styles.scanText}>
                  {isStart ? '取消验证' : '开始进行面部验证'}
                </Text>
              ) : (
                <Text style={styles.scanText}>
                  {isStart ? '取消采集' : '点击进行面部数据采集'}
                </Text>
              )
            }
          </View>
        </Camera>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
          }}
        >
          <View style={{flex: 5, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="check-square-o" size={60} color="#1DBAF1"/>
            <Text style={{color: '#1DBAF1', fontSize: 36}}>
              {status === 'scan' ? '扫描成功' : '验证成功'}
            </Text>
            <TouchableHighlight onPress={this.closeModal}>
              <Text tyle={{fontSize: 24, padding: 10}}>
                {status === 'scan' ? '开始人脸检测' : `welcom ${this.state.userName}`}
              </Text>
            </TouchableHighlight>
          </View>
          <View style={{flex: 1}}></View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scanContainer: {
    flex: 1,
    flexDirection: "row"
  },
  cameraView: {
    flex: 1,
  },
  scanView: {
    flex: 3,
    flexDirection: 'row'
  },
  operateView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  scanText: {
    fontSize: 20,
    color: "#1DBAF1",
    backgroundColor: 'transparent'
  }
});
