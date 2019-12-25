import React, {PureComponent} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

export default class LoginScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  handleEmailInput(email) {
    this.setState({
      email: email,
    });
  }
  handlePasswordInput(password) {
    this.setState({
      password: password,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={text => this.handleEmailInput(text)}
          value={this.state.email}
          style={styles.email}
          placeholder="Email"
          autoCompleteType="email"
          keyboardType="email-address"
          returnKeyType="go"
          textContentType="emailAddress"
        />
        <TextInput
          onChangeText={text => this.handlePasswordInput(text)}
          value={this.state.password}
          style={styles.password}
          placeholder="Password"
          autoCompleteType="password"
          returnKeyType="done"
          secureTextEntry={true}
          textContentType="password"
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
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
  email: {
    borderColor: 'blue',
    borderWidth: 1,
    color: 'green',
    fontSize: 20,
    minWidth: '100%',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  password: {
    borderColor: 'green',
    borderWidth: 1,
    color: 'red',
    fontSize: 20,
    minWidth: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  loginButton: {
    width: '100%',
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: 20,
  },
});
