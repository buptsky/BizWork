import {
  Alert,
  AlertIOS,
  Platform
} from 'react-native'

let BizWorkAlert = Alert;

if (Platform.OS === 'ios') {
  BizWorkAlert = AlertIOS
}

export default BizWorkAlert
