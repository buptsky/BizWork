import {
  Alert,
  AlertIOS,
  Platform
} from 'react-native'

let BizWorkAlert = Alert;

if (Platform.OS === 'ios') {
  EMONAlert = AlertIOS
}

export default BizWorkAlert
