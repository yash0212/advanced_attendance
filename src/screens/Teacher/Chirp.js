import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {key, secret, config} from '../../config/chirp';

class Chirp extends PureComponent {
  state = {
    lectureNumber: '',
    subjectCode: '',
    degree: '',
    department: '',
    section: '',
    year: '',
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.navigation.getParam('department')}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#dadfe3',
    alignItems: 'center',
    padding: 20,
  },
});

export default Chirp;
