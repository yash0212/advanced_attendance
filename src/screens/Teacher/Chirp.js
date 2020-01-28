import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {NativeEventEmitter, NativeModules} from 'react-native';
import Permissions, {PERMISSIONS} from 'react-native-permissions';
import {key, secret, config} from '../../config/chirp';

const ChirpSDK = NativeModules.ChirpSDK;
const ChirpSDKEmitter = new NativeEventEmitter(ChirpSDK);

class Chirp extends PureComponent {
  state = {
    lectureNumber: '',
    subjectCode: '',
    degree: '',
    department: '',
    section: '',
    year: '',
    data: 'hello',
  };
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    const response = await Permissions.check(PERMISSIONS.ANDROID.RECORD_AUDIO);
    if (response !== 'authorized') {
      await Permissions.request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    }
    console.log(('permissision ststuas:', response));

    this.onReceived = ChirpSDKEmitter.addListener('onReceived', event => {
      if (event.data) {
        console.log('data received on chirp: ', event.data);
        this.setState({data: event.data});
      }
    });
    this.onError = ChirpSDKEmitter.addListener('onError', event => {
      console.warn(event.message);
    });

    ChirpSDK.init(key, secret);
    ChirpSDK.setConfig(config);
    ChirpSDK.start();
    // ChirpSDK.sendRandom();
  }

  componentWillUnmount() {
    this.onReceived.remove();
    this.onError.remove();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.navigation.getParam('department')}</Text>
        <Text>{this.state.data}</Text>
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
