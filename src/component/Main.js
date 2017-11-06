import React from 'react';
import {TabNavigator, TabView, TabBarBottom, StackNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WorkFlow from './WorkFlow/WorkFlow';
import Mine from './Mine/Mine';
import BizLab from './BizLab/BizLab';
import FaceScan from  './BizLab/FaceScan';

const Tab = TabNavigator({
    WorkFlow: {
      screen: WorkFlow,
      navigationOptions: {
        tabBarLabel: '工作流程',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'ios-list' : 'ios-list-outline'}
            size={26}
            style={{color: tintColor}}
          />
        ),
      }
    },
    BizLab: {
      screen: BizLab,
      navigationOptions: {
        tabBarLabel: '实验室',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'ios-flask' : 'ios-flask-outline'}
            size={26}
            style={{color: tintColor}}
          />
        )
      }
    },
    Mine: {
      screen: Mine,
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'ios-person' : 'ios-person-outline'}
            size={26}
            style={{color: tintColor}}
          />
        )
      }
    }
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      indicatorStyle : {
        height: 0
      },
      showIcon: true,
      iconStyle: {
        height: 25,
        width: 25
      },
      labelStyle: {
        marginTop: 0,
        marginBottom: 5
      },
    }
  }
);

const Main = StackNavigator(
  {
    Tab: {
      screen: Tab,
      navigationOptions: ({navigation}) => ({
        header: null
      })
    },
    FaceScan: {
      screen: FaceScan,
      navigationOptions: ({navigation}) => ({
        headerTitle: '体验刷脸',
        headerBackTitle: '返回',
        headerStyle: {
          backgroundColor: '#1DBAF1',
        },
        headerTitleStyle: {
          color: '#fff'
        },
        headerTintColor: '#fff'
      })
    },

  },
  {
    navigationOptions: {}
  }
);

export default Main;