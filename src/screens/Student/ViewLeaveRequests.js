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
import {fetchLeaveRequests} from '../../redux/actions';

class ViewLeaveRequests extends PureComponent {
  constructor(props) {
    super(props);
  }
  state = {
    loading: true,
    isRefreshing: false,
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
  renderRequest = req => {
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
    return (
      <View style={styles.leaveContainer}>
        <TouchableOpacity
          style={styles.leave}
          disabled={req.status === 1 || req.status === 3 ? false : true}
          onPress={() => {
            let qrType;
            if (req.status === 1) {
              qrType = 1;
            } else if (req.status === 3) {
              qrType = 2;
            }
            this.props.navigation.navigate('StudentDisplayCode', {
              id: req.id,
              type: 1,
              qrType: qrType,
            });
          }}>
          {req.status === 0 && <View style={styles.statusUnapproved} />}
          {req.status === 1 && <View style={styles.statusApproved} />}
          {req.status === 2 && <View style={styles.statusRejected} />}
          {req.status === 3 && <View style={styles.statusScanned} />}
          {req.status === 4 && <View style={styles.statusCompleted} />}
          {status === 'Unknown' && <View style={styles.statusUnknown} />}
          <View style={styles.requestContent}>
            <Text>Out Date: {req.out_date}</Text>
            <Text>In Date: {req.in_date}</Text>
            <Text>Visit To: {req.visit_to}</Text>
            <Text>Reason: {req.reason}</Text>
            <Text>Status: {status}</Text>
          </View>
        </TouchableOpacity>
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
  render() {
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
        renderItem={({item}) => this.renderRequest(item)}
        keyExtractor={item => 'leave-' + item.id}
        ListEmptyComponent={this.displayEmptyLeave()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
});

const mapStateToProps = state => ({
  err: state.leaveErr,
  leaveRequests: state.leaveRequests,
  token: state.token,
  loading: state.loading,
});
export default connect(
  mapStateToProps,
  {fetchLeaveRequests},
)(ViewLeaveRequests);
