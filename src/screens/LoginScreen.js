import React, {PureComponent} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions';
class LoginScreen extends PureComponent {
  state = {
    regno: '',
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
    // console.log(this.props);
    if (this.props.token) {
      this.props.navigation.navigate('Home');
    }
  }
  handleRegnoInput(regno) {
    this.setState({
      regno: regno,
    });
  }
  handlePasswordInput(password) {
    this.setState({
      password: password,
    });
  }
  _login = async () => {
    this.props.loginUser(this.state.regno, this.state.password);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginFormContainer}>
          <Text style={styles.error}>{this.props.err}</Text>
          <TextInput
            onChangeText={text => this.handleRegnoInput(text)}
            value={this.state.regno}
            style={styles.regno}
            placeholder="Registration Number"
            returnKeyType="go"
            onSubmitEditing={() => {
              this.passwordInput.focus();
            }}
            blurOnSubmit={false}
            autoCapitalize="characters"
            // inlineImageLeft="user_icon"
            // inlineImagePadding={10}
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
    // backgroundColor: 'black',
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
  regno: {
    backgroundColor: 'lightgrey',
    // backgroundColor: 'white',
    fontSize: 20,
    minWidth: '100%',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  password: {
    backgroundColor: 'lightgrey',
    // backgroundColor: 'white',
    fontSize: 20,
    minWidth: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  loginButton: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#6bb9fb',
    padding: 10,
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: 20,
  },
  registerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  noAccountText: {
    fontSize: 14,
  },
  registerText: {
    fontSize: 14,
    color: 'blue',
  },
});

const mapStateToProps = state => ({
  err: state.user.loginErr,
  token: state.user.token,
});
export default connect(mapStateToProps, {loginUser})(LoginScreen);
