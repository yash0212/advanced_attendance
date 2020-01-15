import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {store, persistor} from './src/redux/store';
import {Provider as StoreProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import RegisterGuard from './src/screens/RegisterGuard';
import RegisterTeacher from './src/screens/RegisterTeacher';
import StudentScanAttendance from './src/screens/StudentScanAttendance';
import GuardScanAttendance from './src/screens/GuardScanAttendance';
import StudentAttendance from './src/screens/StudentAttendance';
import ApplyOutingRequest from './src/screens/ApplyOutingRequest';
import AdminOutingRequests from './src/screens/AdminOutingRequests';
import AdminAttendance from './src/screens/AdminAttendance';
import TeacherCreateAttendance from './src/screens/TeacherCreateAttendance';

const HomeStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {headerShown: false},
    },
    AdminOutingRequests: {
      screen: AdminOutingRequests,
      navigationOptions: {title: 'Leave/Outing Requests'},
    },
    AdminAttendance: {
      screen: AdminAttendance,
      navigationOptions: {title: 'Admin View Attendance'},
    },
    RegisterGuard: {
      screen: RegisterGuard,
      navigationOptions: {title: 'Create Guard Account'},
    },
    RegisterTeacher: {
      screen: RegisterTeacher,
      navigationOptions: {title: 'Create Teacher Account'},
    },
    StudentScanAttendance: {
      screen: StudentScanAttendance,
      navigationOptions: {title: 'Scan Attendance Code'},
    },
    StudentAttendance: {
      screen: StudentAttendance,
      navigationOptions: {title: 'Student View Attendance'},
    },
    ApplyOutingRequest: {
      screen: ApplyOutingRequest,
      navigationOptions: {title: 'Apply Leave/Outing'},
    },
    TeacherCreateAttendance: {
      screen: TeacherCreateAttendance,
      navigationOptions: {title: 'Create Attendance Code'},
    },
    GuardScanAttendance: {
      screen: GuardScanAttendance,
      navigationOptions: {title: "Scan Student's Code"},
    },
  },
  {initialRouteName: 'Home'},
);
const RootStack = createSwitchNavigator(
  {
    Login: LoginScreen,
    Home: HomeStackNavigator,
    Register: RegisterScreen,
  },
  {
    initialRouteName: 'Login',
  },
);

let Navigation = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <Navigation />
          </PaperProvider>
        </PersistGate>
      </StoreProvider>
    );
  }
}
