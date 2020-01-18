import React, {PureComponent} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class LoadingScreen extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text>The data is rehydrating please wait for a while</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 20,
    backgroundColor: '#dadfe3',
  },
});
