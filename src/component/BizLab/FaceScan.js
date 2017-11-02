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
      startScan: false, // 采集/验证状态
      status: 'scan' // 判断是采集还是验证
    };
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
    this.timer = setInterval(() => {
      this.takePicture();
    }, 2000);
  }
  // 取消扫描
  cancelScan = () => {
    // 取消动画效果
    this.startAnimate = false;
    this.state.translateValue.setValue({x: 0, y: 0});
    this.setState({startScan: false});
  }
  // 扫描成功
  successScan = () => {
    this.startAnimate = false;
    this.setState({
      startScan: false,
      status: 'login'
    });
  }
  // 识别成功
  successVerify = () => {
    this.startAnimate = false;
    this.setState({
      startScan: false
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
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `data=${encodeURIComponent(res)}&id=test123`
          }).then(res => res.json())
            .then(data => {
              console.log(data);
              // 扫描判断条件，成功采集三次返回
              if (status === 'scan' && data.status) {
                this.successNum++;
                if (this.successNum === 3) {
                  clearInterval(this.timer);
                  alert('scan success');
                  this.successScan();
                } else if (status === 'login' && data.status) {
                  // 得到最终验证结果
                  clearInterval(this.timer);
                  if (!data.username) { // 验证失败

                  } else {
                    alert('verify success');
                    this.successVerify();
                  }
                }
              }
            }).catch(err => console.log(err));
          // 传送图片后删除
          RNFS.unlink(path).then(() => {
            console.log('FILE DELETED');
          }).catch(err => console.error(err));
        }).catch(err => console.error(err));
      }).catch(err => console.error(err));
  }

  render() {
    const isStart = this.state.startScan;
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
            <Text style={styles.scanText}>
              {isStart ? '取消采集': '点击进行面部数据采集'}</Text>
          </View>
        </Camera>
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
    justifyContent: 'center'
  },
  scanText: {
    fontSize: 20,
    color: "#1DBAF1"
  }
});
