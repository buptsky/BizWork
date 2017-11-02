import React from 'react';
import {TabNavigator, TabView, TabBarBottom} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WorkFlow from './WorkFlow/WorkFlow';
import Mine from './Mine/Mine';
import BizLab from './BizLab/BizLab';

const Main = TabNavigator({
    WorkFlow: {
      screen: WorkFlow,
      navigationOptions: {
        tabBarLabel: '工作流程',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={26}
            style={{color: tintColor}}
          />
        )
      }
    },
    BizLab: {
      screen: BizLab,
      navigationOptions: {
        tabBarLabel: '实验室',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'ios-person' : 'ios-person-outline'}
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
    tabBarOptions: {
      activeTintColor: '#ccc',
    },
    tabStyle: {
      width: 100,
    },
    tabBarPosition: 'bottom',
  }
);

export default Main;