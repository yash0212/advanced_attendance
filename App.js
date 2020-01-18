import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {store, persistor} from './src/redux/store';
import {Provider as StoreProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
//Common Screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoadingScreen from './src/screens/LoadingScreen';
//Admin Screens
import RegisterGuard from './src/screens/Admin/RegisterGuard';
import RegisterTeacher from './src/screens/Admin/RegisterTeacher';
import AdminOutingRequests from './src/screens/Admin/ViewOutingRequests';
import AdminLeaveRequests from './src/screens/Admin/ViewLeaveRequests';
import AdminAttendance from './src/screens/Admin/ViewAttendance';
//Stduent Screens
import StudentScanAttendance from './src/screens/Student/ScanAttendance';
import ApplyOutingRequest from './src/screens/Student/ApplyOutingRequest';
import ApplyLeaveRequest from './src/screens/Student/ApplyLeaveRequest';
import StudentAttendance from './src/screens/Student/ViewAttendance';
import StudentViewLeaveRequests from './src/screens/Student/ViewLeaveRequests';
import StudentViewOutingRequests from './src/screens/Student/ViewOutingRequests';
//Teacher Screens
import TeacherCreateAttendance from './src/screens/Teacher/CreateAttendance';
//Guard Screens
import GuardScanAttendance from './src/screens/Guard/ScanCode';

const studentApplyLeaveOutingNavigator = createBottomTabNavigator(
  {
    ApplyOutingRequest: {
      screen: ApplyOutingRequest,
      navigationOptions: {title: 'Outing'},
    },
    ApplyLeaveRequest: {
      screen: ApplyLeaveRequest,
      navigationOptions: {title: 'Leave'},
    },
  },
  {
    initialRouteName: 'ApplyOutingRequest',
    tabBarOptions: {
      activeTintColor: '#ff475d',
      activeBackgroundColor: '#ffffff',
      // inactiveTintColor: '#ffffff',
      inactiveBackgroundColor: '#dadfe3',
      tabStyle: {
        justifyContent: 'center',
      },
      showIcon: false,
      labelStyle: {
        fontSize: 15,
        fontWeight: 'bold',
      },
    },
  },
);
const studentViewLeaveOutingNavigator = createBottomTabNavigator(
  {
    ViewOutingRequests: {
      screen: StudentViewOutingRequests,
      navigationOptions: {title: 'Outing'},
    },
    ViewLeaveRequests: {
      screen: StudentViewLeaveRequests,
      navigationOptions: {title: 'Leave'},
    },
  },
  {
    initialRouteName: 'ViewOutingRequests',
    tabBarOptions: {
      activeTintColor: '#ff475d',
      activeBackgroundColor: '#ffffff',
      // inactiveTintColor: '#ffffff',
      inactiveBackgroundColor: '#dadfe3',
      tabStyle: {
        justifyContent: 'center',
      },
      showIcon: false,
      labelStyle: {
        fontSize: 15,
        fontWeight: 'bold',
      },
    },
  },
);

// const adminLeaveOutingNavigator = createBottomTabNavigator(
//   {
//     ApplyOutingRequest: {
//       screen: AdminOutingRequests,
//       navigationOptions: {title: 'Apply for Outing'},
//     },
//     ApplyLeaveRequest: {screen: AdminLeaveRequests, title: 'Apply for Leave'},
//   },
//   {
//     initialRouteName: 'ApplyOutingRequest',
//   },
// );

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
    ApplyOutingRequest: {
      screen: studentApplyLeaveOutingNavigator,
      navigationOptions: {title: 'Apply for Leave/Outing'},
    },
    StudentAttendance: {
      screen: StudentAttendance,
      navigationOptions: {title: 'Student View Attendance'},
    },
    StudentViewLeaveOutingRequests: {
      screen: studentViewLeaveOutingNavigator,
      navigationOptions: {title: 'Leave/Outing Requests'},
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
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <PaperProvider>
            <Navigation />
          </PaperProvider>
        </PersistGate>
      </StoreProvider>
    );
  }
}
