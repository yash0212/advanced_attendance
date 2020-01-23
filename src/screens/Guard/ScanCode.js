import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';
import endpoint from '../../apis/apiConfig';
import {connect} from 'react-redux';
import {getDisplay} from 'react-native-device-info';

class ScanCode extends PureComponent {
  state = {
    flashEnabled: 0,
    loading: false,
    requestData: undefined,
  };
  takePicture = async () => {
    if (this.camera) {
      const options = {
        quality: 0.5,
        base64: true,
        width: 800,
        fixOrientation: true,
      };
      const data = await this.camera.takePictureAsync(options);
      this.setState({
        loading: true,
      });
      try {
        const awsResponse = await fetch(
          'https://dizpw6y7m8.execute-api.ap-south-1.amazonaws.com/prod/',
          {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({imageData: data.base64}),
          },
        );
        const awsData = await awsResponse.json();
        // const awsData = {
        //   hash:
        //     'LTEyS626B0mMfIUEnS16uyyF@7uoLuU2L$7fvh84l7aySVye7Lu542547bo1WoCATdu8bU9s0mnf4EEtNME09r3pX316BCejqxVL',
        // };
        if (awsData.hash.length === 100) {
          const verifyResponse = await fetch(
            endpoint + '/api/verify-leave-outing',
            {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.props.token,
                Accept: 'application/json',
              },
              body: JSON.stringify({hash: awsData.hash}),
            },
          );
          const verifyData = await verifyResponse.json();
          if (verifyData.status === 'success') {
            this.setState({requestData: verifyData.data, loading: false});
          } else if (verifyData.status === 'error') {
            this.setState({loading: false});
            Snackbar.show({
              text: verifyData.msg,
              duration: Snackbar.LENGTH_SHORT,
            });
          } else {
            Snackbar.show({
              text: 'Some other error from server, check logs',
              duration: Snackbar.LENGTH_SHORT,
            });
            this.setState({loading: false});
          }
        } else {
          this.setState({loading: false});
          Snackbar.show({
            text: 'Code Invalid. Please Scan Again',
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      } catch (err) {
        this.setState({
          loading: false,
        });
        Snackbar.show({
          text: err.message,
          duration: Snackbar.LENGTH_SHORT,
        });
        console.log('error in catch', err);
      }
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
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else if (this.state.requestData !== undefined) {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.closeIconContainer}
            onPress={() => {
              this.setState({requestData: undefined});
            }}>
            <Icon
              name="close"
              size={40}
              color="#f85959"
              styles={styles.closeIcon}
            />
          </TouchableOpacity>
          <View style={styles.container}>
            <Image
              style={styles.studentImage}
              source={{uri: this.state.requestData.applied_by.image_url}}
            />
            <Text style={styles.studentName}>
              {this.state.requestData.applied_by.name}
            </Text>
            <Text style={styles.studentRegno}>
              {this.state.requestData.applied_by.regno}
            </Text>
            {this.state.requestData.status === -1 && (
              <Text style={styles.failedStatus}>Unknown Error</Text>
            )}
            {this.state.requestData.status === 0 && (
              <Text style={styles.unapprovedStatus}>Unapproved</Text>
            )}
            {this.state.requestData.status === 1 && (
              <Text style={styles.approvedStatus}>Approved</Text>
            )}
            {this.state.requestData.status === 2 && (
              <Text style={styles.rejectedStatus}>Rejected</Text>
            )}
          </View>
        </View>
      );
    } else {
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
  closeIconContainer: {
    width: '100%',
    display: 'flex',
    paddingLeft: 10,
  },
  studentImage: {
    width: 300,
    height: 300,
  },
  studentName: {
    margin: 10,
    fontSize: 20,
  },
  studentRegno: {
    margin: 10,
    fontSize: 20,
  },
  failedStatus: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    marginTop: 20,
    backgroundColor: 'black',
    color: '#ffffff',
  },
  unapprovedStatus: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    marginTop: 20,
    backgroundColor: 'grey',
    color: '#ffffff',
  },
  approvedStatus: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    marginTop: 20,
    backgroundColor: 'green',
  },
  rejectedStatus: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    marginTop: 20,
    backgroundColor: 'red',
  },
});

const mapStateToProps = state => ({
  token: state.token,
});
export default connect(mapStateToProps, null)(ScanCode);
