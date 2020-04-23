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
  fetchOutingRequests,
  updateOutingRequest,
  resetMsg,
} from '../../redux/actions';
import Snackbar from 'react-native-snackbar';

class ViewOutingRequests extends PureComponent {
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
    } else if (props.outingRequests) {
      return {
        outingRequests: props.outingRequests,
        loading: false,
        isRefreshing: false,
      };
    } else {
      return null;
    }
  }
  componentDidMount() {
    this.refreshOutingRequests();
  }
  refreshOutingRequests = () => {
    this.setState({loading: true});
    this.props.fetchOutingRequests(this.props.token);
  };
  _updateRequestStatus = (id, status) => {
    this.props.updateOutingRequest(this.props.token, id, status);

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
      case 3:
        status = 'Scanned';
        break;
      case 4:
        status = 'Completed';
        break;
      default:
        status = 'Unknown';
        break;
    }
    let dispButton =
      (req.status === 0 || req.status === -1) &&
      this.state.buttonVisible['outing_' + index];
    return (
      <View style={styles.outingContainer}>
        <TouchableOpacity
          style={styles.outing}
          onPress={() => {
            let buttonVisible = this.state.buttonVisible;
            let oldBtnStatus = buttonVisible['outing_' + index];
            Object.keys(buttonVisible).forEach((x, i) => {
              buttonVisible[x] = false;
            });
            buttonVisible['outing_' + index] = !oldBtnStatus;
            this.setState({
              buttonVisible: buttonVisible,
              refreshList: !this.state.refreshList,
            });
          }}
          disabled={req.status !== 0 && req.status !== -1}>
          {req.status === 0 && <View style={styles.statusUnapproved} />}
          {req.status === 1 && <View style={styles.statusApproved} />}
          {req.status === 2 && <View style={styles.statusRejected} />}
          {req.status === 3 && <View style={styles.statusScanned} />}
          {req.status === 4 && <View style={styles.statusCompleted} />}
          {status === 'Unknown' && <View style={styles.statusUnknown} />}
          <View style={styles.requestContent}>
            <Text>Applied By: {req.applied_by.name}</Text>
            <Text>Date: {req.date}</Text>
            <Text>Out Time: {req.out_time}</Text>
            <Text>In Time: {req.in_time}</Text>
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
    this.refreshOutingRequests();
  };
  displayEmptyOuting = () => {
    return <Text>No outing request available to display</Text>;
  };
  componentDidUpdate(prevProps) {
    if (
      prevProps.updateOutingMsg !== '' &&
      prevProps.updateOutingMsg === this.props.updateOutingMsg
    ) {
      this.props.resetMsg();
    } else if (this.props.updateOutingMsg !== '') {
      Snackbar.show({
        text: this.props.updateOutingMsg,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }

  render() {
    if (!this.state.loading && this.props.outingRequests.length === 0) {
      return (
        <View style={styles.container}>
          <Text>No outing request available to display</Text>
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
          data={this.props.outingRequests}
          renderItem={({item, index}) => this.renderRequest(item, index)}
          keyExtractor={item => 'outing_' + item.id}
          ListEmptyComponent={this.displayEmptyOuting()}
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
  outingContainer: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginBottom: 20,
    overflow: 'hidden',
  },
  outing: {
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
  statusScanned: {
    backgroundColor: 'yellow',
    width: 10,
  },
  statusCompleted: {
    backgroundColor: 'blue',
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
  err: state.outingErr,
  outingRequests: state.outingRequests,
  token: state.token,
  loading: state.loading,
  updateOutingMsgType: state.updateOutingMsgType,
  updateOutingMsg: state.updateOutingMsg,
});
export default connect(
  mapStateToProps,
  {
    fetchOutingRequests,
    updateOutingRequest,
    resetMsg,
  },
)(ViewOutingRequests);
