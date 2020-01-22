import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

class CreateAttendance extends PureComponent {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.generateCodeFormContainer}>
          <TextInput
            onChangeText={text => this.handleEmailInput(text)}
            value={this.state.email}
            style={styles.email}
            placeholder="Email"
            autoCompleteType="email"
            keyboardType="email-address"
            returnKeyType="go"
            textContentType="emailAddress"
            autoCapitalize="none"
            onSubmitEditing={() => {
              this.nameInput.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            onChangeText={text => this.handleNameInput(text)}
            value={this.state.name}
            style={styles.name}
            placeholder="Name"
            autoCompleteType="name"
            autoCapitalize="words"
            returnKeyType="go"
            ref={input => {
              this.nameInput = input;
            }}
            onSubmitEditing={() => {
              this.passwordInput.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            onChangeText={text => this.handlePasswordInput(text)}
            value={this.state.password}
            style={styles.password}
            placeholder="Password"
            autoCompleteType="password"
            returnKeyType="go"
            secureTextEntry={true}
            textContentType="password"
            ref={input => {
              this.passwordInput = input;
            }}
            onSubmitEditing={() => {
              this.confirmPasswordInput.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            onChangeText={text => this.handleConfirmPasswordInput(text)}
            value={this.state.confirmPassword}
            style={styles.confirmPassword}
            placeholder="Confirm Password"
            returnKeyType="go"
            secureTextEntry={true}
            textContentType="password"
            ref={input => {
              this.confirmPasswordInput = input;
            }}
          />

          <TouchableOpacity
            style={styles.createButton}
            onPress={() => {
              this._createAccount();
            }}>
            <Text style={styles.createButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View> */}
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
  generateCodeFormContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    backgroundColor: 'red',
    color: 'red',
    marginBottom: 5,
  },
  success: {
    backgroundColor: 'green',
    color: 'green',
    marginBottom: 5,
  },
  email: {
    backgroundColor: '#ffffff',
    color: '#072b3e',
    fontSize: 20,
    minWidth: '100%',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  name: {
    backgroundColor: '#ffffff',
    color: '#072b3e',
    fontSize: 20,
    minWidth: '100%',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  password: {
    backgroundColor: '#ffffff',
    color: '#072b3e',
    fontSize: 20,
    minWidth: '100%',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  confirmPassword: {
    backgroundColor: '#ffffff',
    color: '#072b3e',
    fontSize: 20,
    minWidth: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  createButton: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#444444',
    padding: 10,
  },
  createButtonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default CreateAttendance;
