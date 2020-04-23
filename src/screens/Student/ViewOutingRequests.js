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
import {fetchOutingRequests} from '../../redux/actions';

class ViewOutingRequests extends PureComponent {
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
      <View style={styles.outingContainer}>
        <TouchableOpacity
          style={styles.outing}
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
              type: 0,
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
            <Text>Date: {req.date}</Text>
            <Text>Out Time: {req.out_time}</Text>
            <Text>In Time: {req.in_time}</Text>
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
    this.refreshOutingRequests();
  };
  displayEmptyOuting = () => {
    return <Text>No outing request available to display</Text>;
  };

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
          renderItem={({item}) => this.renderRequest(item)}
          keyExtractor={item => 'outing-' + item.id}
          ListEmptyComponent={this.displayEmptyOuting()}
        />
      );
    }
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
});

const mapStateToProps = state => ({
  err: state.outingErr,
  outingRequests: state.outingRequests,
  token: state.token,
  loading: state.loading,
});
export default connect(
  mapStateToProps,
  {fetchOutingRequests},
)(ViewOutingRequests);
