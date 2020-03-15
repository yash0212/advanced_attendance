import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  RefreshControl,
} from 'react-native';
import {NativeEventEmitter, NativeModules} from 'react-native';
import Permissions, {PERMISSIONS} from 'react-native-permissions';
import {key, secret, config} from '../../config/chirp';
import apiUri from '../../config/api';
import Snackbar from 'react-native-snackbar';

const ChirpSDK = NativeModules.ChirpSDK;
const ChirpSDKEmitter = new NativeEventEmitter(ChirpSDK);

class Chirp extends PureComponent {
  state = {
    lectureNumber: '',
    subjectCode: '',
    degree: '',
    department: '',
    section: '',
    year: '',
    data: 'hello',
    studentDetails: [],
    refreshList: true,
    loading: false,
  };
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    this.fetchStudents();
    const response = await Permissions.check(PERMISSIONS.ANDROID.RECORD_AUDIO);
    if (response !== 'authorized') {
      await Permissions.request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    }
    if (response === 'granted') {
      this.onError = ChirpSDKEmitter.addListener('onError', event => {
        console.warn(event.message);
      });
      let data = this.props.navigation.getParam('data');
      let lectureNumber = parseInt(data.lectureNumber);
      let subject = data.subjectId;
      let teacherId = this.props.navigation.getParam('uid');
      let degree = data.degreeId;
      let dept = data.departmentId;
      let sec = data.section.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
      let year = data.year;

      this.timer = setInterval(() => {
        ChirpSDK.send([
          lectureNumber,
          subject,
          teacherId,
          degree,
          dept,
          sec,
          year,
        ]);
      }, 7000);

      ChirpSDK.init(key, secret);
      ChirpSDK.setConfig(config);
      ChirpSDK.start();
    }
  }
  fetchStudents = () => {
    this.setState({loading: true});
    let data = this.props.navigation.getParam('data');
    fetch(apiUri + '/api/fetch-students-detail', {
      method: 'post',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Bearer ' + this.props.navigation.getParam('token'),
      },
      body: JSON.stringify({
        degree: data.degreeId,
        department: data.departmentId,
        section: data.section,
        year: data.year,
        subject_code: data.subjectId,
        lecture_no: data.lectureNumber,
      }),
    })
      .then(resp => resp.json())
      .then(studentDataResp => {
        if (studentDataResp.status === 'success') {
          let studentsData = [...studentDataResp.attendance_data];
          this.setState({
            studentDetails: studentsData,
            refreshList: !this.state.refreshList,
            loading: false,
          });
        }
      })
      .catch(err => {
        console.log(err, err.message);
        this.setState({
          loading: false,
        });
      });
  };
  toggleAttendance = student => {
    var attendance = this.state.studentDetails;
    attendance.forEach((x, i) => {
      if (x.student_id === student.student_id) {
        attendance[i].attendance_status =
          student.attendance_status === 1 ? 0 : 1;
      }
    });
    this.setState({
      studentDetails: attendance,
      refreshList: !this.state.refreshList,
    });
  };
  renderStudentList = (student, index) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.toggleAttendance(student);
          }}
          style={
            student.attendance_status === 0
              ? styles.studentTileAbsent
              : styles.studentTilePresent
          }>
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.studentRegno}>{student.regno}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  submitAttendance = () => {
    let data = this.props.navigation.getParam('data');
    fetch(apiUri + '/api/teacher-submit-attendance', {
      method: 'post',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Bearer ' + this.props.navigation.getParam('token'),
      },
      body: JSON.stringify({
        degree: data.degreeId,
        department: data.departmentId,
        subject_code: data.subjectId,
        section: data.section,
        year: data.year,
        lecture_number: data.lectureNumber,
        attendance_data: this.state.studentDetails,
      }),
    })
      .then(resp => resp.json())
      .then(attResponse => {
        if (attResponse.status === 'success') {
          Snackbar.show({
            text: attResponse.msg,
            duration: Snackbar.LENGTH_LONG,
          });
        } else {
          console.log('Submit attendance api failed: ', attResponse);
          Snackbar.show({
            text: 'Marking attendance failed. Please try again',
            duration: Snackbar.LENGTH_LONG,
          });
        }
      })
      .catch(err => {
        console.log(err, err.message);
      });
  };
  componentWillUnmount() {
    ChirpSDK.stop();
    // this.onReceived.remove();
    this.onError.remove();
    clearInterval(this.timer);
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.studentDetailsContainer}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={() => this.fetchStudents()}
            />
          }
          data={this.state.studentDetails}
          renderItem={({item, index}) => this.renderStudentList(item, index)}
          keyExtractor={item => 'student_' + item.student_id}
          extraData={this.state.refreshList}
        />
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => this.submitAttendance()}>
          <Text style={styles.submitBtnText}>Submit Attendance</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#dadfe3',
    // alignItems: 'center',
    padding: 20,
  },
  studentDetailsContainer: {},
  studentTileAbsent: {
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 0,
    marginVertical: 5,
  },
  studentTilePresent: {
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 0,
    marginVertical: 5,
  },
  studentName: {
    color: '#ffffff',
  },
  studentRegno: {
    color: '#ffffff',
  },
  submitBtn: {
    marginTop: 20,
    backgroundColor: '#444444',
    padding: 10,
    alignSelf: 'flex-end',
  },
  submitBtnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'right',
  },
});

export default Chirp;
