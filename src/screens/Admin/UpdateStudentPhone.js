import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import apiUri from '../../config/api';
import Snackbar from 'react-native-snackbar';

class UpdateStudentPhone extends PureComponent {
  state = {
    regno: '',
    s_phno: '',
    p_phno: '',
    p_email: '',
    loading: false,
  };
  constructor(props) {
    super(props);
  }
  handleRegnoInput(regno) {
    this.setState({
      regno: regno,
    });
  }
  handleSPhnoInput(s_phno) {
    this.setState({
      s_phno: s_phno,
    });
  }
  handlePPhnoInput(p_phno) {
    this.setState({
      p_phno: p_phno,
    });
  }
  handleParentEmail(email) {
    this.setState({
      p_email: email,
    });
  }
  updateDetails = () => {
    this.setState({loading: true});
    fetch(apiUri + '/api/update-student-phone-number', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.props.navigation.getParam('token'),
      },
      body: JSON.stringify({
        regno: this.state.regno,
        student_phone_number: this.state.s_phno,
        parent_phone_number: this.state.p_phno,
        parent_email: this.state.p_email,
      }),
    })
      .then(resp => resp.json())
      .then(updateDetailsResp => {
        if (updateDetailsResp.status === 'success') {
          Snackbar.show({
            text: updateDetailsResp.message,
            duration: Snackbar.LENGTH_SHORT,
          });
          this.setState({
            regno: '',
            s_phno: '',
            p_phno: '',
            p_email: '',
            loading: false,
          });
        } else {
          throw updateDetailsResp;
        }
      })
      .catch(err => {
        console.log(err, err.message);
        this.setState({
          loading: false,
        });
        Snackbar.show({
          text: err.message,
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.updateDetailsContainer}>
          <TextInput
            onChangeText={text => this.handleRegnoInput(text)}
            value={this.state.regno}
            style={styles.regno}
            placeholder="Student's Registration Number"
            returnKeyType="go"
            onSubmitEditing={() => {
              this.sphnoInput.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            onChangeText={text => this.handleSPhnoInput(text)}
            value={this.state.s_phno}
            style={styles.sphno}
            placeholder="Student's Phone Number"
            returnKeyType="go"
            ref={input => {
              this.sphnoInput = input;
            }}
            onSubmitEditing={() => {
              this.pphnoInput.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            onChangeText={text => this.handlePPhnoInput(text)}
            value={this.state.p_phno}
            style={styles.pphno}
            placeholder="Parent's Phone Number"
            returnKeyType="go"
            ref={input => {
              this.pphnoInput = input;
            }}
            onSubmitEditing={() => {
              this.pEmail.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            onChangeText={text => this.handleParentEmail(text)}
            value={this.state.p_email}
            style={styles.pemail}
            placeholder="Parent's email"
            returnKeyType="go"
            ref={input => {
              this.pEmail = input;
            }}
          />
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => {
              this.updateDetails();
            }}
            disabled={this.state.loading}>
            <Text style={styles.updateDetailsButtonText}>
              Create/Update Details
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    height: '100%',
    padding: 20,
    backgroundColor: '#dadfe3',
  },
  updateDetailsContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  regno: {
    backgroundColor: '#ffffff',
    color: '#072b3e',
    fontSize: 20,
    minWidth: '100%',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  sphno: {
    backgroundColor: '#ffffff',
    color: '#072b3e',
    fontSize: 20,
    minWidth: '100%',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  pphno: {
    backgroundColor: '#ffffff',
    color: '#072b3e',
    fontSize: 20,
    minWidth: '100%',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  pemail: {
    backgroundColor: '#ffffff',
    color: '#072b3e',
    fontSize: 20,
    minWidth: '100%',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  updateButton: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#444444',
    padding: 10,
  },
  updateDetailsButtonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default UpdateStudentPhone;
