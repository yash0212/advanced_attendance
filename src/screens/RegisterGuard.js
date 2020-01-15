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

class RegisterGuard extends PureComponent {
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
      ToastAndroid.show('Account Created Successfully', ToastAndroid.SHORT);
      this.props.resetMsg();
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
  _createAccount = async () => {
    this.props.registerUser(
      this.state.email,
      this.state.name,
      this.state.password,
      this.state.confirmPassword,
      this.state.regno,
      3,
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
          />

          <TouchableOpacity
            style={styles.createButton}
            onPress={() => {
              this._createAccount();
            }}>
            <Text style={styles.createButtonText}>Create Account</Text>
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

const mapStateToProps = state => ({
  err: state.registerErr,
  msg: state.registerMsg,
  msgType: state.registerMsgType,
  token: state.token,
});
export default connect(mapStateToProps, {registerUser, resetMsg})(
  RegisterGuard,
);
