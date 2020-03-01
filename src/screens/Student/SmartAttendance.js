import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  EventSubscriptionVendor,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {key, secret, config} from '../../config/chirp';
import {NativeEventEmitter, NativeModules} from 'react-native';
import Permissions, {PERMISSIONS} from 'react-native-permissions';

const ChirpSDK = NativeModules.ChirpSDK;
const ChirpSDKEmitter = new NativeEventEmitter(ChirpSDK);

class SmartAttendance extends PureComponent {
  state = {
    attendanceMarked: false,
  };
  async componentDidMount() {
    try {
      const response = await Permissions.check(
        PERMISSIONS.ANDROID.RECORD_AUDIO,
      );
      if (response !== 'authorized') {
        await Permissions.request(PERMISSIONS.ANDROID.RECORD_AUDIO);
      }
      console.log(response);
      if (response === 'granted') {
        this.onReceived = ChirpSDKEmitter.addListener('onReceived', event => {
          if (event.data) {
            console.log('data received on chirp student: ', event.data);
            if (event.data.length === 2) {
              if (
                event.data[0] === 1 &&
                event.data[1] === this.props.navigation.getParam('user_id')
              ) {
                clearInterval(this.timer);
                this.setState({attendanceMarked: true});
              }
            }
          }
        });
        this.onError = ChirpSDKEmitter.addListener('onError', event => {
          console.warn(event.message);
        });

        ChirpSDK.init(key, secret);
        ChirpSDK.setConfig(config);
        ChirpSDK.start();

        this.timer = setInterval(() => {
          ChirpSDK.send([0, this.props.navigation.getParam('user_id')]);
        }, 5000);
      }
    } catch (error) {
      console.error(error);
    }
  }
  componentWillUnmount() {
    ChirpSDK.stop();
    this.onReceived.remove();
    this.onError.remove();
    clearInterval(this.timer);
  }
  render() {
    if (this.state.attendanceMarked) {
      return (
        <View style={styles.container}>
          <Text>Attendance Marked Successfully</Text>
          <Icon name="check-all" size={20} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text>Marking Attendance</Text>
        <ActivityIndicator />
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
  },
  flashButton: {
    margin: 20,
  },
  preview: {
    alignSelf: 'center',
    width: 300,
    height: 400,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default SmartAttendance;
