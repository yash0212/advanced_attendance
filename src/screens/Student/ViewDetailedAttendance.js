import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import apiUri from '../../config/api';
import Snackbar from 'react-native-snackbar';

class ViewDetailedAttendance extends PureComponent {
  state = {
    attendanceData: [],
    refreshList: 0,
  };
  componentDidMount() {
    fetch(
      apiUri +
        '/api/student-view-detailed-attendance?subject_code=' +
        this.props.navigation.getParam('subject_code'),
      {
        method: 'get',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: 'Bearer ' + this.props.navigation.getParam('token'),
        },
      },
    )
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

  renderAttendance = attendance => {
    return (
      <View style={styles.attendance}>
        {attendance.attendance_status === 0 && (
          <View style={styles.absentAttendance} />
        )}
        {attendance.attendance_status === 1 && (
          <View style={styles.presentAttendance} />
        )}
        <View style={styles.attendanceDetails}>
          <Text style={styles.date}>{attendance.date}</Text>
          <Text style={styles.lectureNumber}>{attendance.lecture_number}</Text>
        </View>
      </View>
    );
  };
  displayEmptyAttendance = () => {
    return (
      <View style={styles.emptyAttendance}>
        <Text>No Attendance Data Available</Text>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.subjectCode}>
          {this.props.navigation.getParam('subject_code')}
        </Text>
        <Text style={styles.totalHours}>
          Total Hours: {this.props.navigation.getParam('total_hours')}
        </Text>
        <Text style={styles.totalHours}>
          Present Hours: {this.props.navigation.getParam('attended_hours')}
        </Text>
        <Text style={styles.totalHours}>
          Absent Hours: {this.props.navigation.getParam('absent_hours')}
        </Text>
        {this.state.attendanceData.length !== 0 && (
          <View style={styles.tableHeader}>
            <Text style={styles.headerDate}>Date</Text>
            <Text style={styles.headerLNo}>Lecture Number</Text>
          </View>
        )}
        <FlatList
          style={styles.attContainer}
          data={this.state.attendanceData}
          renderItem={({item}) => this.renderAttendance(item)}
          keyExtractor={item => 'attendance-' + item.date}
          ListEmptyComponent={this.displayEmptyAttendance()}
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
  subjectCode: {
    fontSize: 30,
    marginVertical: 5,
  },
  totalHours: {
    fontSize: 18,
  },
  emptyAttendance: {
    marginTop: 25,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 30,
    marginTop: 25,
    marginBottom: 10,
  },
  headerDate: {
    fontSize: 20,
  },
  headerLNo: {
    fontSize: 20,
  },
  attContainer: {},
  attendance: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 0,
    marginVertical: 5,
  },
  absentAttendance: {
    backgroundColor: 'red',
    width: 10,
  },
  presentAttendance: {
    backgroundColor: 'green',
    width: 10,
  },
  attendanceDetails: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
  },
});

export default ViewDetailedAttendance;
