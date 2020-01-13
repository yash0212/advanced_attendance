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
  renderTitle() {
    return (
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
    );
  }
  render() {
    if (this.props.user.user_type === 0) {
      //User is Admin
      return (
        <View style={styles.container}>
          {this.renderTitle()}
          <TouchableOpacity style={styles.tile}>
            <Text style={styles.tileTitle}>Show Leave/Outing Requests</Text>
            <Text style={styles.tileDescription}>
              You can approve or reject the student leave/outing requests
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile}>
            <Text style={styles.tileTitle}>View Attendance</Text>
            <Text style={styles.tileDescription}>
              You can view attendance for all the lectures
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile}>
            <Text style={styles.tileTitle}>Create Teacher Account</Text>
            <Text style={styles.tileDescription}>
              Create a account for teacher's access
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile}>
            <Text style={styles.tileTitle}>Create Guard Account</Text>
            <Text style={styles.tileDescription}>
              Create a account for guard's access
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.user.user_type === 1) {
      //User is Student
      return (
        <View style={styles.container}>
          {this.renderTitle()}
          <TouchableOpacity style={styles.tile}>
            <Text style={styles.tileTitle}>Scan Attendance Code</Text>
            <Text style={styles.tileDescription}>
              You can mark attendance for your lectures
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile}>
            <Text style={styles.tileTitle}>Apply For Leave/Outing</Text>
            <Text style={styles.tileDescription}>
              You can apply for leave or outing pass for going out of college
              campus
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile}>
            <Text style={styles.tileTitle}>View Attendance</Text>
            <Text style={styles.tileDescription}>
              Check your attendance and statistics
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.user.user_type === 2) {
      //User is Teacher
      return (
        <View style={styles.container}>
          {this.renderTitle()}
          <TouchableOpacity style={styles.tile}>
            <Text style={styles.tileTitle}>Generate Attendance Code</Text>
            <Text style={styles.tileDescription}>
              Create a attendance code which can be scanned by students for
              marking attendance
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.user.user_type === 3) {
      // User is Guard
      return (
        <View style={styles.container}>
          {this.renderTitle()}
          <TouchableOpacity style={styles.tile}>
            <Text style={styles.tileTitle}>Verify Leave/Outing</Text>
            <Text style={styles.tileDescription}>
              Scan the student's code and verify if he/she is permitted to leave
              the college campus
            </Text>
          </TouchableOpacity>
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
    backgroundColor: '#dadfe3',
    flex: 1,
    padding: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  titleContainer: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
    color: '#072b3e',
  },
  logout: {
    fontSize: 30,
    color: '#ff475d',
  },
  tile: {
    margin: 10,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 10,
  },
  tileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#072b3e',
  },
  tileDescription: {
    fontSize: 16,
    color: '#072b3e',
  },
});

const mapStateToProps = state => ({
  token: state.token,
  user: state.user,
});
export default connect(mapStateToProps)(HomeScreen);
