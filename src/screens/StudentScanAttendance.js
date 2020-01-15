import React, {PureComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

class StudentScanAttendance extends PureComponent {
  state = {
    flashEnabled: 0,
  };
  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5};
      const data = await this.camera.takePictureAsync(options);
      fetch('https://dizpw6y7m8.execute-api.ap-south-1.amazonaws.com/prod/', {
        method: 'post',
        headers: {
          'Content-Type': 'image/jpg',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log('data: ', data);
        });
      console.log(data.uri);
    }
  };
  toggleFlash = () => {
    this.setState({
      flashEnabled: this.state.flashEnabled ? 0 : 1,
    });
  };
  renderFlash = () => {
    if (this.state.flashEnabled) {
      return (
        <TouchableOpacity
          style={styles.flashButton}
          onPress={() => {
            this.toggleFlash();
          }}>
          <Icon name="flash" size={40} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.flashButton}
          onPress={() => {
            this.toggleFlash();
          }}>
          <Icon name="flash-off" size={40} />
        </TouchableOpacity>
      );
    }
  };
  render() {
    return (
      <View style={styles.container}>
        {this.renderFlash()}
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={
            this.state.flashEnabled
              ? RNCamera.Constants.FlashMode.on
              : RNCamera.Constants.FlashMode.off
          }
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          // androidRecordAudioPermissionOptions={{
          //   title: 'Permission to use audio recording',
          //   message: 'We need your permission to use your audio',
          //   buttonPositive: 'Ok',
          //   buttonNegative: 'Cancel',
          // }}
        />
        <View>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> SNAP </Text>
          </TouchableOpacity>
        </View>
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

export default StudentScanAttendance;
