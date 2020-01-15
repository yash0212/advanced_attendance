import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';

class ViewLeaveRequests extends PureComponent {
  render() {
    return <View style={styles.container}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#dadfe3',
    alignItems: 'center',
  },
});

export default ViewLeaveRequests;
