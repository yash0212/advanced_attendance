import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Picker,
  ActivityIndicator,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import apiUri from '../../config/api';
import DateTimePicker from '@react-native-community/datetimepicker';

class ViewAttendanceForm extends PureComponent {
  state = {
    lectureNumber: '2',
    subjectId: 1,
    subject: '',
    subjects: [],
    degreeId: '',
    degrees: [],
    departmentId: '',
    departments: [],
    section: 'B',
    year: 4,
    loading: true,
    showDate: false,
    date: new Date(),
  };
  constructor(props) {
    super(props);
  }
  handleLectureNumberInput(lectureNumber) {
    this.setState({lectureNumber: lectureNumber});
  }
  handleSectionInput(section) {
    this.setState({section: section});
  }
  handleYearInput(year) {
    this.setState({year: year});
  }
  renderSubjects = () => {
    return this.state.subjects.map((x, i) => (
      <Picker.Item key={i} label={x.name} value={x.id} />
    ));
  };
  renderDegrees = () => {
    return this.state.degrees.map((x, i) => (
      <Picker.Item key={i} label={x.name} value={x.id} />
    ));
  };
  renderDepartments = () => {
    return this.state.departments.map((x, i) => (
      <Picker.Item key={i} label={x.name} value={x.id} />
    ));
  };
  _viewAttendance = () => {
    this.props.navigation.navigate('AdminViewAttendance', {
      uid: this.props.navigation.getParam('uid'),
      token: this.props.navigation.getParam('token'),
      data: this.state,
    });
  };
  async componentDidMount() {
    try {
      //Fetch Degrees
      let subjectsResp = await fetch(apiUri + '/api/fetch-subjects', {
        method: 'get',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
      });
      subjectsResp = await subjectsResp.json();
      if (subjectsResp.status === 'success') {
        this.setState({subjects: subjectsResp.data});
      } else {
        throw 'Fetch subjects api error';
      }

      //Fetch Degrees
      let degreesResp = await fetch(apiUri + '/api/fetch-degrees', {
        method: 'get',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
      });
      degreesResp = await degreesResp.json();
      if (degreesResp.status === 'success') {
        this.setState({
          degreeId: degreesResp.data[0].id,
          degrees: degreesResp.data,
        });
      } else {
        throw 'Fetch degree api error';
      }

      //Fetch Departments
      let departmentsResp = await fetch(apiUri + '/api/fetch-departments', {
        method: 'get',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
      });
      departmentsResp = await departmentsResp.json();
      if (departmentsResp.status === 'success') {
        this.setState({
          departmentId: departmentsResp.data[0].id,
          departments: departmentsResp.data,
        });
      } else {
        throw 'Fetch department api error';
      }

      this.setState({loading: false});
    } catch (e) {
      console.log(e);
      Snackbar.show({
        text: 'Some error occurred. Please check your internet and retry',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }
  setDate = (event, date) => {
    date = date || this.state.outDate;
    this.setState({
      showDate: false,
      date: date,
    });
  };
  formatDate = date => {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [
      (dd > 9 ? '' : '0') + dd,
      '/' + (mm > 9 ? '' : '0') + mm,
      '/',
      date.getFullYear(),
    ].join('');
  };
  render() {
    const {showDate, date} = this.state;
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.generateCodeFormContainer}>
          {showDate && (
            <DateTimePicker
              value={date}
              onChange={this.setDate}
              maximumDate={new Date()}
            />
          )}
          <TouchableOpacity
            style={styles.date}
            onPress={() => {
              this.setState({
                showDate: true,
              });
            }}>
            <Text style={styles.dateText}>{this.formatDate(date)}</Text>
          </TouchableOpacity>
          <TextInput
            onChangeText={text => this.handleLectureNumberInput(text)}
            value={this.state.lectureNumber}
            style={styles.lectureNumber}
            placeholder="Lecture Number"
            keyboardType="numeric"
            returnKeyType="go"
            blurOnSubmit={false}
          />

          <Picker
            selectedValue={this.state.subjectId}
            style={styles.subject}
            onValueChange={subject => this.setState({subjectId: subject})}>
            {this.renderSubjects()}
          </Picker>
          <Picker
            selectedValue={this.state.degreeId}
            style={styles.degree}
            onValueChange={degree => this.setState({degreeId: degree})}>
            {this.renderDegrees()}
          </Picker>
          <Picker
            selectedValue={this.state.departmentId}
            style={styles.department}
            onValueChange={department =>
              this.setState({departmentId: department})
            }>
            {this.renderDepartments()}
          </Picker>
          <TextInput
            onChangeText={text => this.handleSectionInput(text)}
            value={this.state.section}
            style={styles.section}
            placeholder="Section"
            returnKeyType="go"
            ref={input => {
              this.sectionInput = input;
            }}
            onSubmitEditing={() => {
              this.yearInput.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            onChangeText={text => this.handleYearInput(text)}
            value={`${this.state.year}`}
            keyboardType="numeric"
            style={styles.year}
            placeholder="Year"
            returnKeyType="done"
            ref={input => {
              this.yearInput = input;
            }}
          />

          <TouchableOpacity
            style={styles.createButton}
            onPress={() => {
              this._viewAttendance();
            }}>
            <Text style={styles.submitBtn}>View Attendance</Text>
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
    padding: 20,
  },
  generateCodeFormContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    backgroundColor: '#ffffff',
    minWidth: '100%',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  dateText: {
    fontSize: 20,
    color: '#072b3e',
  },
  lectureNumber: {
    backgroundColor: '#ffffff',
    color: '#072b3e',
    fontSize: 20,
    minWidth: '100%',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  subject: {
    backgroundColor: '#ffffff',
    color: '#072b3e',
    fontSize: 20,
    minWidth: '100%',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  degree: {
    backgroundColor: '#ffffff',
    color: '#072b3e',
    fontSize: 20,
    minWidth: '100%',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  department: {
    backgroundColor: '#ffffff',
    color: '#072b3e',
    fontSize: 20,
    minWidth: '100%',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  section: {
    backgroundColor: '#ffffff',
    color: '#072b3e',
    fontSize: 20,
    minWidth: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  year: {
    backgroundColor: '#ffffff',
    color: '#072b3e',
    fontSize: 20,
    minWidth: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  createButton: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#444444',
    padding: 10,
  },
  submitBtn: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default ViewAttendanceForm;
