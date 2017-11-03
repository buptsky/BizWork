import {
  AsyncStorage
} from 'react-native'

export default fetchData = (options) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token', (error, token) => {
      if (!error && token) {
        options.data.token = token
      }

      const fetchOption = {
        method: options.method || 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(options.data)
      };

      fetch(options.url, fetchOption).then((response)=>{
        if(response.success) {
          resolve(response.data);
        } else {
          BizWorkAlert(response);
          reject(response);
        }
      })
    })
  });
};