import React from 'react';
import {TabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WorkFlow from './WorkFlow/WorkFlow';
import Mine from './Mine/Mine';
import BizLab from './BizLab/BizLab';

const Main = TabNavigator({
  WorkFlow: {
    screen: WorkFlow,
    navigationOptions: {
      tabBarLabel: 'Home',
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
      tabBarLabel: 'Mine',
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
      tabBarLabel: 'Mine',
      tabBarIcon: ({tintColor, focused}) => (
        <Ionicons
          name={focused ? 'ios-person' : 'ios-person-outline'}
          size={26}
          style={{color: tintColor}}
        />
      )
    }
  }
});

export default Main;