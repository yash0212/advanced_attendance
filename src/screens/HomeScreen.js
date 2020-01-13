import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/dist/Entypo';
import {LOGOUT} from '../redux/actions';

class HomeScreen extends PureComponent {
  _logout() {
    this.props.dispatch({type: LOGOUT});
    ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT);
    this.props.navigation.navigate('Login');
  }
  render() {
    if (this.props.user.user_type === 0) {
      //User is Admin
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Home</Text>
          <Text style={styles.title}>{this.props.user.name}</Text>
          <Text style={styles.title}>Admin</Text>
        </View>
      );
    } else if (this.props.user.user_type === 1) {
      //User is Student
      return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{this.props.user.name}</Text>
            <TouchableOpacity>
              <Icon
                name="log-out"
                style={styles.logout}
                onPress={() => {
                  this._logout();
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.title}></View>
          <Text style={styles.title}>{this.props.user.name}</Text>
          <Text style={styles.title}>Student</Text>
        </View>
      );
    } else if (this.props.user.user_type === 2) {
      //User is Teacher
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Home</Text>
          <Text style={styles.title}>{this.props.user.name}</Text>
          <Text style={styles.title}>Teacher</Text>
        </View>
      );
    } else if (this.props.user.user_type === 3) {
      // User is Guard
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Home</Text>
          <Text style={styles.title}>{this.props.user.name}</Text>
          <Text style={styles.title}>Guard</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>Not a valid user</Text>
        </View>
      );
    }
  }
}

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  titleContainer: {
    // backgroundColor: 'blue',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    // borderColor: 'blue',
    // borderWidth: 1,
    // color: 'green',
    fontSize: 30,
  },
  logout: {
    fontSize: 30,
  },
});

const mapStateToProps = state => ({
  token: state.token,
  user: state.user,
});
export default connect(mapStateToProps)(HomeScreen);
