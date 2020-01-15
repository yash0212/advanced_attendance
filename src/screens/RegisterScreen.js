import React, {PureComponent} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ToastAndroid,
} from 'react-native';
// import {TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {registerUser, resetMsg} from '../redux/actions';
import Message from '../components/Message';

class RegisterScreen extends PureComponent {
  state = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    regno: '',
  };
  constructor(props) {
    super(props);
    this.props.resetMsg();
  }
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.token) {
      return {token: nextProps.token};
    } else {
      return null;
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.msgType === 'success') {
      ToastAndroid.show('Registered Successfully', ToastAndroid.SHORT);
      this.props.navigation.navigate('Home');
    }
  }
  handleEmailInput(email) {
    this.setState({
      email: email,
    });
  }
  handleNameInput(name) {
    this.setState({
      name: name,
    });
  }
  handlePasswordInput(password) {
    this.setState({
      password: password,
    });
  }
  handleConfirmPasswordInput(password) {
    this.setState({
      confirmPassword: password,
    });
  }
  handleRegnoInput(regno) {
    this.setState({
      regno: regno,
    });
  }
  _register = async () => {
    this.props.registerUser(
      this.state.email,
      this.state.name,
      this.state.password,
      this.state.confirmPassword,
      this.state.regno,
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.registerFormContainer}>
          <Message msg={this.props.msg} msgType={this.props.msgType} />
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
            onSubmitEditing={() => {
              this.regnoInput.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            onChangeText={text => this.handleRegnoInput(text)}
            value={this.state.regno}
            style={styles.regno}
            placeholder="Registration Number"
            returnKeyType="done"
            autoCapitalize="characters"
            maxLength={15}
            ref={input => {
              this.regnoInput = input;
            }}
          />
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => {
              this._register();
            }}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.alreadyAccountText}>
            Already have an account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}>
            <Text style={styles.loginText}> Login Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = new StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    height: '100%',
    padding: 20,
    backgroundColor: '#dadfe3',
  },
  registerFormContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  regno: {
    backgroundColor: '#ffffff',
    color: '#072b3e',
    fontSize: 20,
    minWidth: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  registerButton: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#444444',
    padding: 10,
  },
  registerButtonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  alreadyAccountText: {
    fontSize: 14,
    color: '#072b3e',
  },
  loginText: {
    fontSize: 14,
    color: 'blue',
  },
});

const mapStateToProps = state => ({
  err: state.registerErr,
  msg: state.registerMsg,
  msgType: state.registerMsgType,
  token: state.token,
});
export default connect(mapStateToProps, {registerUser, resetMsg})(
  RegisterScreen,
);
