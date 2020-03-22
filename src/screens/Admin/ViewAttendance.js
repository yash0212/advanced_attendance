import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {key, secret, config} from '../../config/chirp';
import apiUri from '../../config/api';
import Snackbar from 'react-native-snackbar';

class ViewAttendance extends PureComponent {
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

  renderStudentList = (student, index) => {
    return (
      <View
        style={
          student.attendance_status === 0
            ? styles.studentTileAbsent
            : styles.studentTilePresent
        }>
        <Text style={styles.studentName}>{student.name}</Text>
        <Text style={styles.studentRegno}>{student.regno}</Text>
      </View>
    );
  };

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
          style={styles.goBackBtn}
          onPress={() => this.props.navigation.goBack()}>
          <Text style={styles.goBackBtnText}>Go Back</Text>
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
  goBackBtn: {
    marginTop: 20,
    backgroundColor: '#444444',
    padding: 10,
    alignSelf: 'flex-start',
  },
  goBackBtnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'right',
  },
});

export default ViewAttendance;
