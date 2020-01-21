import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Message from '../../components/Message';
import {connect} from 'react-redux';
import {applyOutingRequest, resetMsg} from '../../redux/actions';
import Snackbar from 'react-native-snackbar';

class ApplyOutingRequest extends PureComponent {
  constructor(props) {
    super(props);
    this.props.resetMsg();
  }
  state = {
    visitTo: '',
    reason: '',
    inTime: new Date(),
    outTime: new Date(),
    showInTime: false,
    showOutTime: false,
    loading: false,
  };
  static getDerivedStateFromProps(props, state) {
    if (typeof props.loading === 'boolean') {
      return {loading: props.loading};
    } else {
      return null;
    }
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.applyOutingMsg !== '' &&
      prevProps.applyOutingMsg === this.props.applyOutingMsg
    ) {
      this.props.resetMsg();
    } else if (this.props.applyOutingMsg !== '') {
      Snackbar.show({
        text: this.props.applyOutingMsg,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      // console.log('here');
    }
  }
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
    if (this.state.visitTo === '') {
      Snackbar.show({
        text: 'The visit to field is required.',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (this.state.reason === '') {
      Snackbar.show({
        text: 'The reason field is required.',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (this.state.inTime.getTime() === this.state.outTime.getTime()) {
      Snackbar.show({
        text: 'The out time and in time cannot be same.',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      this.props.applyOutingRequest(
        this.props.token,
        this.state.visitTo,
        this.state.reason,
        this.state.outTime,
        this.state.inTime,
      );
      this.setState({
        inTime: new Date(),
        outTime: new Date(),
        visitTo: '',
        reason: '',
      });
    }
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
            }}
            disabled={this.state.loading}>
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

const mapStateToProps = state => ({
  err: state.outingErr,
  outingRequests: state.outingRequests,
  token: state.token,
  loading: state.loading,
  applyOutingMsg: state.applyOutingMsg,
});
export default connect(mapStateToProps, {applyOutingRequest, resetMsg})(
  ApplyOutingRequest,
);
