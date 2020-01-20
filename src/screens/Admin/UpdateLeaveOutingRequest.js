import React, {PureComponent} from 'react';
import {View, StyleSheet, Text} from 'react-native';

class UpdateLeaveOutingRequest extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.navigation.getParam('date', 'NO-DATE')}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dadfe3',
  },
});

export default UpdateLeaveOutingRequest;
