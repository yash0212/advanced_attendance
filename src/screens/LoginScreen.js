import React, {PureComponent} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions';
import Message from '../components/Message';
import {getUniqueId} from 'react-native-device-info';
class LoginScreen extends PureComponent {
  constructor(props) {
    super(props);
    if (this.props.token) {
      this.props.navigation.navigate('Home');
    }
  }
  state = {
    email: '',
    password: '',
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.token) {
      return {token: nextProps.token};
    } else {
      return null;
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.token) {
      ToastAndroid.show('Logged in successfully', ToastAndroid.SHORT);
      this.props.navigation.navigate('Home');
    }
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
  _login = async () => {
    this.props.loginUser(this.state.email, this.state.password);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginFormContainer}>
          <Text>{getUniqueId()}</Text>
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
            returnKeyType="done"
            secureTextEntry={true}
            textContentType="password"
            ref={input => {
              this.passwordInput = input;
            }}
            // inlineImageLeft="lock_icon"
            // inlineImagePadding={10}
          />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              this._login();
            }}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.registerContainer}>
          <Text style={styles.noAccountText}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Register');
            }}>
            <Text style={styles.registerText}> Register Here</Text>
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
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#dadfe3',
  },
  loginFormContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 5,
  },
  email: {
    backgroundColor: '#ffffff',
    fontSize: 20,
    minWidth: '100%',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#072b3e',
  },
  password: {
    backgroundColor: '#ffffff',
    // backgroundColor: 'white',
    fontSize: 20,
    minWidth: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    color: '#072b3e',
  },
  loginButton: {
    width: '100%',
    marginTop: 20,
    // backgroundColor: '#6bb9fb',
    backgroundColor: '#444444',
    padding: 10,
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  registerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  noAccountText: {
    fontSize: 14,
    color: '#072b3e',
  },
  registerText: {
    fontSize: 14,
    color: 'blue',
  },
});

const mapStateToProps = state => ({
  err: state.loginErr,
  token: state.token,
  msg: state.loginMsg,
  msgType: state.loginMsgType,
});
export default connect(mapStateToProps, {loginUser})(LoginScreen);
