import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Loading from '../common/loading/Loading'

export default class WorkFlow extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    const MockList = ['待办事项1','待办事项2','待办事项3'];

    this.state = {
      isLoading: true,
      dataSource: this.ds.cloneWithRows(MockList),
    };

  }

  render() {
    const {isLoading, dataSource} = this.state;
    return (
      <View style={styles.container}>
        {
          isLoading ?
            <Loading/> :
            <ListView
              dataSource={dataSource}
              renderRow={(rowData) => {
                return <WorkFlowItem rowData={rowData}/>
              }}
              onEndReachedThreshold={10}
            />
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});