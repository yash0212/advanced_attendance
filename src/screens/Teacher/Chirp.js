import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {NativeEventEmitter, NativeModules} from 'react-native';
import Permissions, {PERMISSIONS} from 'react-native-permissions';
import {key, secret, config} from '../../config/chirp';
import apiUri from '../../config/api';

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
      this.onReceived = ChirpSDKEmitter.addListener('onReceived', event => {
        if (event.data) {
          console.log('data received on chirp teacher: ', event.data);
          if (event.data.length === 2) {
            let studentId = event.data[1];
            if (event.data[0] === 0 && studentId !== undefined) {
              let ind = -1;
              this.state.studentDetails.forEach((x, i) => {
                if (x.id === studentId) {
                  ind = i;
                }
              });
              if (ind !== -1) {
                let updatedStudentList = this.state.studentDetails;
                updatedStudentList[ind].attStatus = 1;
                this.setState({
                  studentDetails: updatedStudentList,
                  refreshList: !this.state.refreshList,
                });
              }
              //send chirp to stop student from sending anymore data
              ChirpSDK.send([1, studentId]);
              this.setState({data: event.data});
            }
          }
        }
      });
      this.onError = ChirpSDKEmitter.addListener('onError', event => {
        console.warn(event.message);
      });

      ChirpSDK.init(key, secret);
      ChirpSDK.setConfig(config);
      ChirpSDK.start();
    }
  }
  fetchStudents = () => {
    fetch(apiUri + '/api/fetch-students-detail', {
      method: 'post',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Bearer ' + this.props.navigation.getParam('token'),
      },
      body: JSON.stringify({
        degree: this.props.navigation.getParam('data').degree,
        department: this.props.navigation.getParam('data').department,
        section: this.props.navigation.getParam('data').section,
        year: this.props.navigation.getParam('data').year,
      }),
    })
      .then(resp => resp.json())
      .then(studentDataResp => {
        if (studentDataResp.status === 'success') {
          let studentsData = [...studentDataResp.students_data];
          studentsData = studentsData.map(x => {
            x.attStatus = 0;
            return x;
          });
          this.setState({
            studentDetails: studentsData,
            refreshList: !this.state.refreshList,
          });
        }
      })
      .catch(err => {
        console.log(err, err.message);
      });
  };
  renderStudentList = (student, index) => {
    if (student.attStatus === 0) {
      return (
        <View style={styles.studentTileAbsent}>
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.studentRegno}>{student.regno}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.studentTilePresent}>
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.studentRegno}>{student.regno}</Text>
        </View>
      );
    }
  };
  displayEmptyStudentList = () => {
    return <Text>No Student Data available yet</Text>;
  };
  submitAttendance = () => {};
  componentWillUnmount() {
    ChirpSDK.stop();
    this.onReceived.remove();
    this.onError.remove();
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.studentDetailsContainer}
          data={this.state.studentDetails}
          renderItem={({item, index}) => this.renderStudentList(item, index)}
          keyExtractor={item => 'student_' + item.id}
          ListEmptyComponent={this.displayEmptyStudentList()}
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
