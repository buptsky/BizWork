import React, {Component} from 'react';
import {View, Text, StyleSheet, ListView, TouchableWithoutFeedback, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Loading from '../../common/Loading/Loading';
import WorkFlowItem from './WorkFlowItem';

export default class WorkFlow extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      isLoading: false,
      dataSource: this.ds.cloneWithRows([])
    };

  }

  renderWorkFlowList = () => {
    const MockList = ['待办事项1', '待办事项2', '待办事项3'];
    {/*<ListView
      dataSource={dataSource}
      renderRow={(rowData) => {
        return <WorkFlowItem rowData={rowData}/>
      }}
      onEndReachedThreshold={10}
    />*/
    }
    return (
      <View style={styles.container}>{
        MockList.map((ele, index) => {
          return (
            <TouchableWithoutFeedback key={index}>
              <LinearGradient colors={['#039be5', '#3dbefd']} style={styles.labItemView}>
                <Icon name='briefcase' size={36} color="#fff" style={styles.iconStyle}/>
                <Text style={styles.labDesc}>{ele}</Text>
              </LinearGradient>
            </TouchableWithoutFeedback>
          )
        })
      }
      </View>
    );
  };

  render() {
    const {isLoading, dataSource} = this.state;
    return (
      <View style={styles.container}>
        {
          isLoading ?
            <Loading/> : this.renderWorkFlowList()
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Platform.OS === 'ios' ? 35 : 15
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