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
import {applyLeaveRequest, resetMsg} from '../../redux/actions';
import Snackbar from 'react-native-snackbar';

class ApplyLeaveRequest extends PureComponent {
  constructor(props) {
    super(props);
    this.props.resetMsg();
  }
  state = {
    visitTo: '',
    reason: '',
    inDate: new Date(),
    outDate: new Date(),
    showInDate: false,
    showOutDate: false,
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
      prevProps.applyLeaveMsg !== '' &&
      prevProps.applyLeaveMsg === this.props.applyLeaveMsg
    ) {
      this.props.resetMsg();
    } else if (this.props.applyLeaveMsg !== '') {
      Snackbar.show({
        text: this.props.applyLeaveMsg,
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
  setOutDate = (event, date) => {
    date = date || this.state.outDate;
    var inDate =
      date.getDate() - this.state.inDate.getDate() > 0
        ? date
        : this.state.inDate;
    this.setState({
      showOutDate: false,
      inDate: inDate,
      outDate: date,
    });
  };
  setInDate = (event, date) => {
    date = date || this.state.inDate;
    this.setState({
      showInDate: false,
      inDate: date,
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
    } else if (this.state.inDate.getTime() === this.state.outDate.getTime()) {
      Snackbar.show({
        text: 'The out date and in date cannot be same.',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      this.props.applyLeaveRequest(
        this.props.token,
        this.state.visitTo,
        this.state.reason,
        this.state.outDate,
        this.state.inDate,
      );
      this.setState({
        inDate: new Date(),
        outDate: new Date(),
        visitTo: '',
        reason: '',
      });
    }
  }
  render() {
    const {inDate, showInDate, outDate, showOutDate} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.applyFormContainer}>
          <Message msg={this.props.msg} msgType={this.props.msgType} />
          <View style={styles.datesContainer}>
            {showOutDate && (
              <DateTimePicker
                minimumDate={new Date()}
                value={outDate}
                onChange={this.setOutDate}
              />
            )}
            <TouchableOpacity
              style={styles.date}
              onPress={() => {
                this.setState({
                  showOutDate: true,
                });
              }}>
              <Text style={styles.dateTitle}>Out Date</Text>
              <Text style={styles.dateText}>{this.formatDate(outDate)}</Text>
            </TouchableOpacity>
            {showInDate && (
              <DateTimePicker
                minimumDate={outDate}
                value={inDate}
                onChange={this.setInDate}
              />
            )}
            <TouchableOpacity
              style={styles.date}
              onPress={() => {
                this.setState({showInDate: true});
              }}>
              <Text style={styles.dateTitle}>In Date</Text>
              <Text style={styles.dateText}>{this.formatDate(inDate)}</Text>
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
  datesContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  date: {
    alignItems: 'center',
  },
  dateTitle: {
    fontSize: 25,
    color: '#072b3e',
  },
  dateText: {
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
  err: state.leaveErr,
  leaveRequests: state.leaveRequests,
  token: state.token,
  loading: state.loading,
  applyLeaveMsg: state.applyLeaveMsg,
});
export default connect(mapStateToProps, {applyLeaveRequest, resetMsg})(
  ApplyLeaveRequest,
);
