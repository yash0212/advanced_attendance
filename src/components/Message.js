import React, {PureComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Message extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    // console.log('Mesasge render props:', this.props);
    if (this.props.msg) {
      return (
        <View style={styles.container}>
          <Text
            style={
              this.props.msgType === 'error' ? styles.error : styles.success
            }>
            {this.props.msg}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = new StyleSheet.create({
  container: {},
  error: {
    color: 'red',
    marginBottom: 5,
  },
  success: {
    color: 'green',
    marginBottom: 5,
  },
});
