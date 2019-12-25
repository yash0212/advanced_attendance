import React, {PureComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class LoginScreen extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
      </View>
    );
  }
}

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    borderColor: 'blue',
    borderWidth: 1,
    color: 'green',
    fontSize: 20,
  },
});
