import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {key, secret, config} from '../../config/chirp';
import {NativeEventEmitter, NativeModules} from 'react-native';
import Permissions, {PERMISSIONS} from 'react-native-permissions';
import apiUri from '../../config/api';
import Snackbar from 'react-native-snackbar';
import Encrypto from '../../helpers/Encrypto';

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
      if (response === 'granted') {
        this.onReceived = ChirpSDKEmitter.addListener('onReceived', event => {
          if (event.data) {
            console.log('data received on chirp student: ', event.data);
            //Check if required data is received on chirp
            if (event.data.length === 7) {
              this._markAttendance(event.data);
            }
          }
        });
        this.onError = ChirpSDKEmitter.addListener('onError', event => {
          console.warn(event.message);
        });

        ChirpSDK.init(key, secret);
        ChirpSDK.setConfig(config);
        ChirpSDK.start();
      }
    } catch (error) {
      console.error(error);
    }
  }
  _markAttendance = data => {
    let enc = new Encrypto();
    let lectureNumber = data[0];
    let subject = data[1];
    let teacherId = data[2];
    let degree = data[3];
    let dept = data[4];
    let sec = data[5];
    sec = String.fromCharCode('A'.charCodeAt(0) + sec - 1);
    let year = data[6];

    // lecture_no, subject_id, teacher_id, degree, department, section, year
    var hash = enc.getCode(
      lectureNumber,
      subject,
      teacherId,
      degree,
      dept,
      sec,
      year,
      0,
    );

    fetch(apiUri + '/api/student-mark-attendance', {
      method: 'post',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Bearer ' + this.props.navigation.getParam('token'),
      },
      body: JSON.stringify({
        code: hash,
      }),
    })
      .then(resp => {
        if (resp.status === 401) {
          Snackbar.show({
            text: 'Please login again to continue',
            duration: Snackbar.LENGTH_LONG,
          });
          this.props.navigation.navigate('Login');
        } else {
          return resp.json();
        }
      })
      .then(attendanceMarkedResp => {
        if (attendanceMarkedResp.status === 'success') {
          Snackbar.show({
            text: attendanceMarkedResp.msg,
            duration: Snackbar.LENGTH_LONG,
          });
          this.setState({
            attendanceMarked: true,
          });
        }
      })
      .catch(err => {
        console.log(err, err.message);
      });
  };
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
        <TouchableOpacity
          onPress={() => {
            this._markAttendance(2, 2, 2, 2, 2, 2, 2);
          }}>
          <Text>mark att</Text>
        </TouchableOpacity>
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
