import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

class CreateAttendance extends PureComponent {
  state = {
    lectureNumber: '2',
    subjectCode: '15CS402',
    degree: 'B.Tech.',
    department: 'CSE',
    section: 'E',
    year: 4,
  };
  constructor(props) {
    super(props);
  }
  handleLectureNumberInput(lectureNumber) {
    this.setState({lectureNumber: lectureNumber});
  }
  handleSubjectCodeInput(subjectCode) {
    this.setState({subjectCode: subjectCode});
  }
  handleDegreeInput(degree) {
    this.setState({degree: degree});
  }
  handleDepartmentInput(department) {
    this.setState({department: department});
  }
  handleSectionInput(section) {
    this.setState({section: section});
  }
  handleYearInput(year) {
    this.setState({year: year});
  }
  _displayCode = () => {
    this.props.navigation.navigate('TeacherDisplayCode', this.state);
  };
  _chirp = () => {
    this.props.navigation.navigate('TeacherChirp', {
      token: this.props.navigation.getParam('token'),
      data: this.state,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.generateCodeFormContainer}>
          <TextInput
            onChangeText={text => this.handleLectureNumberInput(text)}
            value={this.state.lectureNumber}
            style={styles.lectureNumber}
            placeholder="Lecture Number"
            keyboardType="numeric"
            returnKeyType="go"
            onSubmitEditing={() => {
              this.subjectCodeInput.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            onChangeText={text => this.handleSubjectCodeInput(text)}
            value={this.state.subjectCode}
            style={styles.subjectCode}
            placeholder="Subject Code"
            autoCapitalize="characters"
            returnKeyType="go"
            ref={input => {
              this.subjectCodeInput = input;
            }}
            onSubmitEditing={() => {
              this.degreeInput.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            onChangeText={text => this.handleDegreeInput(text)}
            value={this.state.degree}
            style={styles.degree}
            placeholder="Degree"
            returnKeyType="go"
            ref={input => {
              this.degreeInput = input;
            }}
            onSubmitEditing={() => {
              this.departmentInput.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            onChangeText={text => this.handleDepartmentInput(text)}
            value={this.state.department}
            style={styles.department}
            placeholder="Department"
            autoCapitalize="characters"
            returnKeyType="go"
            ref={input => {
              this.departmentInput = input;
            }}
            onSubmitEditing={() => {
              this.sectionInput.focus();
            }}
            blurOnSubmit={false}
          />
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
              this._displayCode();
            }}>
            <Text style={styles.submitBtn}>Display Code</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => {
              this._chirp();
            }}>
            <Text style={styles.submitBtn}>Chirp On</Text>
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
  lectureNumber: {
    backgroundColor: '#ffffff',
    color: '#072b3e',
    fontSize: 20,
    minWidth: '100%',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  subjectCode: {
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

export default CreateAttendance;
