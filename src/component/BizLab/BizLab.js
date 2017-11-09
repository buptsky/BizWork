import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Text,
  Button,
  TouchableWithoutFeedback,
  Platform,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import FaceScan from './FaceScan';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import fetchData from '../../util/fetchData';
import  servers from '../../util/servers';
export default class BizLab extends Component {

  static navigationOptions = ({navigation}) => {
    const {state, setParams} = navigation;
  };
  
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  // 判断是否采集过数据
  async componentWillMount() {
    try {
      const res =  await fetchData({
        url: servers.FaceScan + '/queryUser.do',
        data: {}
      });
      if (res.status) {
        await AsyncStorage.setItem('status', 'login');
        console.log('isCollect');
      } else {
        await AsyncStorage.setItem('status', 'scan');
      }
      this.setState({
        loading: false
      });
    } catch(err) {
      console.log(err);
    }
  }

  componentWillUnmount() {
    console.log('unmount');
  }
  
  render() {
    console.log(this.props.navigation.state.params);;
    const {navigate} = this.props.navigation;
    console.log(navigate);
    return (
      <View style={styles.labContainer}>
        {
          this.state.loading ? (
            <ActivityIndicator color="#1DBAF1" size={"large"}/>
          ) : (
            <View style={{flex: 1}}>
              <TouchableWithoutFeedback onPress={() => {
                navigate('FaceScan')
              }}>
                <LinearGradient colors={['#32C05E', '#A1E5BE']} style={styles.labItemView}>
                  <Icon name='camera-retro' size={36} color="#fff" style={styles.iconStyle}/>
                  <Text style={styles.labDesc}>体验刷脸</Text>
                </LinearGradient>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <LinearGradient colors={['#A361C3', '#D9B9E8']} style={styles.labItemView}>
                  <Icon name='flask' size={36} color="#fff" style={styles.iconStyle}/>
                  <Text style={styles.labDesc}>敬请期待</Text>
                </LinearGradient>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <LinearGradient colors={['#DD7286', '#F3B9C5']} style={styles.labItemView}>
                  <Icon name='flask' size={36} color="#fff" style={styles.iconStyle}/>
                  <Text style={styles.labDesc}>敬请期待</Text>
                </LinearGradient>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <LinearGradient colors={['#1DBAF1', '#87CEFA']} style={styles.labItemView}>
                  <Icon name='flask' size={36} color="#fff" style={styles.iconStyle}/>
                  <Text style={styles.labDesc}>敬请期待</Text>
                </LinearGradient>
              </TouchableWithoutFeedback>
            </View>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  labContainer: {
    flex: 1,
    padding: 10,
    paddingTop: Platform.OS === 'ios' ? 35 : 15,
    justifyContent: 'center'
  },
  labItemView: {
    height: 100,
    borderRadius: 10,
    backgroundColor: '#1DBAF1',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10
  },
  iconStyle: {
    backgroundColor: 'transparent'
  },
  labDesc: {
    color: '#fff',
    fontSize: 26,
    backgroundColor: 'transparent'
  }
});
