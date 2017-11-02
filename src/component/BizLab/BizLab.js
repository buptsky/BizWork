import React, {Component} from 'react';
import {StyleSheet, View, Animated, Text} from 'react-native';
import FaceScan from './FaceScan';

export default class BizLab extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.labContainer}>
        <FaceScan/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  labContainer: {
    flex: 1
  }
});
