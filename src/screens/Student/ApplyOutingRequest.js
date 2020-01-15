import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Message from '../../components/Message';

class ApplyLeaveRequest extends PureComponent {
  state = {
    visitTo: '',
    reason: '',
    inTime: new Date(),
    outTime: new Date(),
    showInTime: false,
    showOutTime: false,
  };
  handleReasonInput = reason => {
    this.setState({
      reason: reason,
    });
  };
  handleVisitToInput = visitTo => {
    this.setState({
      visitTo: visitTo,
    });
  };
  setOutTime = (event, time) => {
    time = time || this.state.outTime;
    var inTime = time - this.state.inTime > 0 ? time : this.state.inTime;
    this.setState({
      showOutTime: false,
      outTime: time,
      inTime: inTime,
    });
  };
  setInTime = (event, time) => {
    time = time || this.state.inTime;
    var outTime = time - this.state.outTime < 0 ? time : this.state.outTime;
    this.setState({
      showInTime: false,
      outTime: outTime,
      inTime: time,
    });
  };
  formatTime = date => {
    var hh = date.getHours(); // getMonth() is zero-based
    var mm = date.getMinutes();

    return [(hh > 9 ? '' : '0') + hh, ':' + (mm > 9 ? '' : '0') + mm].join('');
  };
  _apply() {
    ToastAndroid.show('Applied Successfully', ToastAndroid.SHORT);
  }
  render() {
    const {inTime, showInTime, outTime, showOutTime} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.applyFormContainer}>
          <Message msg={this.props.msg} msgType={this.props.msgType} />
          <View style={styles.timesContainer}>
            {showOutTime && (
              <DateTimePicker
                mode="time"
                value={outTime}
                onChange={this.setOutTime}
                minuteInterval={30}
                is24Hour={true}
              />
            )}
            <TouchableOpacity
              style={styles.time}
              onPress={() => {
                this.setState({
                  showOutTime: true,
                });
              }}>
              <Text style={styles.timeTitle}>Out Time</Text>
              <Text style={styles.timeText}>{this.formatTime(outTime)}</Text>
            </TouchableOpacity>
            {showInTime && (
              <DateTimePicker
                mode="time"
                value={inTime}
                onChange={this.setInTime}
                minuteInterval={30}
                is24Hour={true}
              />
            )}
            <TouchableOpacity
              style={styles.time}
              onPress={() => {
                this.setState({showInTime: true});
              }}>
              <Text style={styles.timeTitle}>In Time</Text>
              <Text style={styles.timeText}>{this.formatTime(inTime)}</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            onChangeText={text => this.handleVisitToInput(text)}
            value={this.state.visitTo}
            style={styles.visitTo}
            placeholder="Visit To"
            returnKeyType="go"
            ref={input => {
              this.visitToInput = input;
            }}
            onSubmitEditing={() => {
              this.reasonInput.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            onChangeText={text => this.handleReasonInput(text)}
            value={this.state.reason}
            style={styles.reason}
            placeholder="Reason"
            returnKeyType="done"
            ref={input => {
              this.reasonInput = input;
            }}
          />
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => {
              this._apply();
            }}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    height: '100%',
    padding: 20,
    backgroundColor: '#dadfe3',
  },
  applyFormContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timesContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  time: {
    alignItems: 'center',
  },
  timeTitle: {
    fontSize: 25,
    color: '#072b3e',
  },
  timeText: {
    fontSize: 20,
    color: '#072b3e',
  },
  visitTo: {
    backgroundColor: '#ffffff',
    color: '#072b3e',
    fontSize: 20,
    minWidth: '100%',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  reason: {
    backgroundColor: '#ffffff',
    color: '#072b3e',
    fontSize: 20,
    minWidth: '100%',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  applyButton: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#444444',
    padding: 10,
  },
  applyButtonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default ApplyLeaveRequest;
