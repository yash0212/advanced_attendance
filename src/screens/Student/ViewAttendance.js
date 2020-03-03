import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import apiUri from '../../config/api';
import Snackbar from 'react-native-snackbar';

class ViewAttendance extends PureComponent {
  state = {
    attendanceData: [],
    refreshList: 0,
  };
  componentDidMount() {
    fetch(apiUri + '/api/student-view-attendance', {
      method: 'get',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Bearer ' + this.props.navigation.getParam('token'),
      },
    })
      .then(resp => resp.json())
      .then(attResponse => {
        if (attResponse.status === 'success') {
          this.setState({
            attendanceData: attResponse.attendance_data,
            refreshList: !this.state.refreshList,
          });
        } else {
          Snackbar.show({
            text: 'Cannot fetch attendance' + attResponse.msg,
            duration: Snackbar.LENGTH_LONG,
          });
        }
      })
      .catch(err => {
        console.log(err, err.message);
      });
  }

  renderSubject = subject => {
    return (
      <View>
        <TouchableOpacity
          style={styles.subject}
          onPress={e => {
            this.props.navigation.navigate('StudentViewDetailedAttendance', {
              subject_code: subject.subject_code,
              token: this.props.navigation.getParam('token'),
              total_hours: subject.total_hours,
              attended_hours: subject.attended_hours,
              absent_hours: subject.absent_hours,
            });
          }}>
          <Text style={styles.subjectCode}>{subject.subject_code}</Text>
          <Text style={styles.attendance}>
            {subject.attended_hours}/{subject.total_hours}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  displayEmptySubjects = () => {
    return (
      <View style={styles.emptySubjectContainer}>
        <Text>No Attendance Data Available</Text>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerSubject}>Subject Code</Text>
          <Text style={styles.headerHours}>Attended/Total</Text>
        </View>
        <FlatList
          style={styles.subjectContainer}
          data={this.state.attendanceData}
          renderItem={({item}) => this.renderSubject(item)}
          keyExtractor={item => 'subject-' + item.subject_code}
          ListEmptyComponent={this.displayEmptySubjects()}
          extraData={this.state.refreshList}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#dadfe3',
    padding: 20,
  },
  header: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerSubject: {
    fontSize: 20,
  },
  headerHours: {
    fontSize: 20,
  },
  emptySubjectContainer: {
    paddingHorizontal: 10,
  },
  subjectContainer: {},
  subject: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 0,
    marginVertical: 5,
  },
  subjectCode: {},
  attendance: {},
});

export default ViewAttendance;
