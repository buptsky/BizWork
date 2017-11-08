import {AsyncStorage} from 'react-native'
import BizWorkAlert from '../common/BizWorkAlert';

export default fetchData = (options) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('userToken', (error, token) => {
      console.log(token);
      if (!error && token) {
        options.data.id = token;
      }
      if (options.needDefaultServer) {
        options.url = 'http://10.129.148.81:8585' + options.url;
      }
      const fetchOption = {
        method: options.method || 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(options.data)
      };

      fetch(options.url, fetchOption).then(res=>res.json()).then((responseJSON)=>{
        console.log(responseJSON);
        if(responseJSON.success) {
          resolve(responseJSON.data);
        } else {
          // BizWorkAlert(responseJSON.errorMsg);
          reject(responseJSON);
        }
      });
    });
  });
};