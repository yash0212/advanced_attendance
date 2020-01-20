import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {
  fetchLeaveRequests,
  updateLeaveRequest,
  resetMsg,
} from '../../redux/actions';
import Snackbar from 'react-native-snackbar';

class ViewLeaveRequests extends PureComponent {
  constructor(props) {
    super(props);
    this.props.resetMsg();
  }
  state = {
    loading: true,
    isRefreshing: false,
    buttonVisible: {},
    refreshList: true,
  };
  static getDerivedStateFromProps(props, state) {
    if (props.loading) {
      return null;
    } else if (props.leaveRequests) {
      return {
        leaveRequests: props.leaveRequests,
        loading: false,
        isRefreshing: false,
      };
    } else {
      return null;
    }
  }
  componentDidMount() {
    this.refreshLeaveRequests();
  }
  refreshLeaveRequests = () => {
    this.setState({loading: true});
    this.props.fetchLeaveRequests(this.props.token);
  };
  _updateRequestStatus = (id, status) => {
    this.props.updateLeaveRequest(this.props.token, id, status);

    let buttonVisible = this.state.buttonVisible;
    Object.keys(buttonVisible).forEach((x, i) => {
      buttonVisible[x] = false;
    });
    this.setState({
      buttonVisible: buttonVisible,
    });
  };

  renderRequest = (req, index) => {
    var status;
    switch (req.status) {
      case 0:
        status = 'Unapproved';
        break;
      case 1:
        status = 'Approved';
        break;
      case 2:
        status = 'Rejected';
        break;
      default:
        status = 'Unknown';
        break;
    }
    let dispButton =
      (req.status === 0 || req.status === -1) &&
      this.state.buttonVisible['leave_' + index];
    return (
      <View style={styles.leaveContainer}>
        <TouchableOpacity
          style={styles.leave}
          onPress={() => {
            let buttonVisible = this.state.buttonVisible;
            let oldBtnStatus = buttonVisible['leave_' + index];
            Object.keys(buttonVisible).forEach((x, i) => {
              buttonVisible[x] = false;
            });
            buttonVisible['leave_' + index] = !oldBtnStatus;
            this.setState({
              buttonVisible: buttonVisible,
              refreshList: !this.state.refreshList,
            });
          }}
          disabled={req.status !== 0 && req.status !== -1}>
          {req.status === 0 && <View style={styles.statusUnapproved} />}
          {req.status === 1 && <View style={styles.statusApproved} />}
          {req.status === 2 && <View style={styles.statusRejected} />}
          {status === 'Unknown' && <View style={styles.statusUnknown} />}
          <View style={styles.requestContent}>
            <Text>Applied By: {req.applied_by.name}</Text>
            <Text>Out Date: {req.out_date}</Text>
            <Text>In Date: {req.in_date}</Text>
            <Text>Visit To: {req.visit_to}</Text>
            <Text>Reason: {req.reason}</Text>
            <Text>Status: {status}</Text>
          </View>
        </TouchableOpacity>
        {dispButton && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.approveButton}
              onPress={() => {
                this._updateRequestStatus(req.id, 1);
              }}>
              <Text style={styles.buttonText}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rejectButton}
              onPress={() => {
                this._updateRequestStatus(req.id, 0);
              }}>
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  handleRefresh = () => {
    this.setState({loading: true});
    this.refreshLeaveRequests();
  };
  displayEmptyLeave = () => {
    return <Text>No leave request available to display</Text>;
  };
  componentDidUpdate(prevProps) {
    if (
      prevProps.updateLeaveMsg !== '' &&
      prevProps.updateLeaveMsg === this.props.updateLeaveMsg
    ) {
      this.props.resetMsg();
    } else if (this.props.updateLeaveMsg !== '') {
      Snackbar.show({
        text: this.props.updateLeaveMsg,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }

  render() {
    if (!this.state.loading && this.props.leaveRequests.length === 0) {
      return (
        <View style={styles.container}>
          <Text>No leave request available to display</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={() => this.handleRefresh()}
            />
          }
          data={this.props.leaveRequests}
          renderItem={({item, index}) => this.renderRequest(item, index)}
          keyExtractor={item => 'leave_' + item.id}
          ListEmptyComponent={this.displayEmptyLeave()}
          extraData={this.state.refreshList}
        />
      );
    }
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
  leaveContainer: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginBottom: 20,
    overflow: 'hidden',
  },
  leave: {
    display: 'flex',
    flexDirection: 'row',
  },
  statusUnapproved: {
    backgroundColor: 'grey',
    width: 10,
  },
  statusApproved: {
    backgroundColor: 'green',
    width: 10,
  },
  statusRejected: {
    backgroundColor: 'red',
    width: 10,
  },
  statusUnknown: {
    backgroundColor: 'black',
    width: 10,
  },
  requestContent: {
    padding: 10,
    paddingHorizontal: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  approveButton: {
    flex: 1,
    backgroundColor: '#17b978',
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#f85959',
  },
  buttonText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 17,
  },
});

const mapStateToProps = state => ({
  err: state.leaveErr,
  leaveRequests: state.leaveRequests,
  token: state.token,
  loading: state.loading,
  updateLeaveMsgType: state.updateLeaveMsgType,
  updateLeaveMsg: state.updateLeaveMsg,
});
export default connect(mapStateToProps, {
  fetchLeaveRequests,
  updateLeaveRequest,
  resetMsg,
})(ViewLeaveRequests);
