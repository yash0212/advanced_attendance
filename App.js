import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {store, persistor} from './src/redux/store';
import {Provider as StoreProvider} from 'react-redux';
// import {Provider as PaperProvider} from 'react-native-paper';
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
import AdminViewAttendanceForm from './src/screens/Admin/ViewAttendanceForm';
import AdminViewAttendance from './src/screens/Admin/ViewAttendance';
import AdminUpdateStudentPhone from './src/screens/Admin/UpdateStudentPhone';
import AdminStudentNotInCampus from './src/screens/Admin/AdminStudentNotInCampus';
//Stduent Screens
import StudentScanAttendance from './src/screens/Student/ScanAttendance';
import StudentSmartAttendance from './src/screens/Student/SmartAttendance';
import ApplyOutingRequest from './src/screens/Student/ApplyOutingRequest';
import ApplyLeaveRequest from './src/screens/Student/ApplyLeaveRequest';
import StudentAttendance from './src/screens/Student/ViewAttendance';
import StudentDetailedAttendance from './src/screens/Student/ViewDetailedAttendance';
import StudentViewLeaveRequests from './src/screens/Student/ViewLeaveRequests';
import StudentViewOutingRequests from './src/screens/Student/ViewOutingRequests';
import StudentDisplayCode from './src/screens/Student/DisplayCode';
//Teacher Screens
import TeacherCreateAttendance from './src/screens/Teacher/CreateAttendance';
import TeacherDisplayCode from './src/screens/Teacher/DisplayCode';
import TeacherChirp from './src/screens/Teacher/Chirp';
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
const studentViewLeaveCodeNavigator = createStackNavigator(
  {
    ViewLeaveRequests: {
      screen: StudentViewLeaveRequests,
    },
    StudentDisplayCode: {
      screen: StudentDisplayCode,
    },
  },
  {
    initialRouteName: 'ViewLeaveRequests',
    headerMode: 'none',
  },
);
const studentViewOutingCodeNavigator = createStackNavigator(
  {
    ViewOutingRequests: {
      screen: StudentViewOutingRequests,
    },
    StudentDisplayCode: {
      screen: StudentDisplayCode,
    },
  },
  {
    initialRouteName: 'ViewOutingRequests',
    headerMode: 'none',
  },
);
const studentViewLeaveOutingNavigator = createBottomTabNavigator(
  {
    ViewOutingRequests: {
      screen: studentViewOutingCodeNavigator,
      navigationOptions: {title: 'Outing'},
    },
    ViewLeaveRequests: {
      screen: studentViewLeaveCodeNavigator,
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

const studentAttendanceNavigator = createStackNavigator(
  {
    StudentViewAttendance: {
      screen: StudentAttendance,
    },
    StudentViewDetailedAttendance: {
      screen: StudentDetailedAttendance,
    },
  },
  {initialRouteName: 'StudentViewAttendance', headerMode: 'none'},
);
//Admin Bottom Tab navigator
const adminViewLeaveOutingNavigator = createBottomTabNavigator(
  {
    ViewOutingRequests: {
      screen: AdminOutingRequests,
      navigationOptions: {title: 'Outing'},
    },
    ViewLeaveRequests: {
      screen: AdminLeaveRequests,
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

//Teacher Code generator stack navigator
const teacherGenerateCodeNavigator = createStackNavigator(
  {
    TeacherCreateAttendance: {
      screen: TeacherCreateAttendance,
    },
    TeacherDisplayCode: {
      screen: TeacherDisplayCode,
    },
    TeacherChirp: {
      screen: TeacherChirp,
    },
  },
  {initialRouteName: 'TeacherCreateAttendance', headerMode: 'none'},
);

//Admin view attenadance stack navigator
const adminAttendanceNavigator = createStackNavigator(
  {
    AdminViewAttendanceForm: {
      screen: AdminViewAttendanceForm,
    },
    AdminViewAttendance: {
      screen: AdminViewAttendance,
    },
  },
  {initialRouteName: 'AdminViewAttendanceForm', headerMode: 'none'},
);
const HomeStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {headerShown: false},
    },
    AdminOutingRequests: {
      screen: adminViewLeaveOutingNavigator,
      navigationOptions: {title: 'Leave/Outing Requests'},
    },
    AdminAttendance: {
      screen: adminAttendanceNavigator,
      navigationOptions: {title: 'Admin View Attendance'},
    },
    AdminUpdateStudentPhone: {
      screen: AdminUpdateStudentPhone,
      navigationOptions: {title: 'Create/Update Student Details'},
    },
    AdminStudentNotInCampus: {
      screen: AdminStudentNotInCampus,
      navigationOptions: {title: 'Students not in campus'},
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
    StudentSmartAttendance: {
      screen: StudentSmartAttendance,
      navigationOptions: {title: 'Smart Attendance'},
    },
    ApplyOutingRequest: {
      screen: studentApplyLeaveOutingNavigator,
      navigationOptions: {title: 'Apply for Leave/Outing'},
    },
    StudentAttendance: {
      screen: studentAttendanceNavigator,
      navigationOptions: {title: 'View Attendance'},
    },
    StudentViewLeaveOutingRequests: {
      screen: studentViewLeaveOutingNavigator,
      navigationOptions: {title: 'Leave/Outing Requests'},
    },
    TeacherCreateAttendance: {
      screen: teacherGenerateCodeNavigator,
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
          {/* <PaperProvider> */}
          <Navigation />
          {/* </PaperProvider> */}
        </PersistGate>
      </StoreProvider>
    );
  }
}
