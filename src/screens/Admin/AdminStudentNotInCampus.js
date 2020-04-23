import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import apiUri from '../../config/api';

class AdminStudentNotInCampus extends PureComponent {
  constructor(props) {
    super(props);
  }
  state = {
    loading: true,
    isRefreshing: false,
    refreshList: true,
    studentList: [],
  };
  fetchStudentsNotInCampus = () => {
    fetch(apiUri + '/api/student-not-in-campus', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.props.navigation.getParam('token'),
      },
    })
      .then(resp => resp.json())
      .then(studentResp => {
        if (studentResp.status === 'success') {
          this.setState({
            loading: false,
            refreshList: !this.state.refreshList,
            studentList: studentResp.students,
          });
        } else {
          throw studentResp;
        }
      })
      .catch(err => {
        console.log(err, err.message);
        this.setState({
          loading: false,
        });
        Snackbar.show({
          text: err.message,
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  };
  componentDidMount() {
    this.fetchStudentsNotInCampus();
  }

  handleRefresh = () => {
    this.setState({loading: true});
    this.fetchStudentsNotInCampus();
  };
  displayEmptyList = () => {
    return <Text>No students available to display</Text>;
  };
  renderItem = (item, index) => {
    return (
      <View style={styles.itemContainer}>
        <Text>
          {item.name} ({item.student_regno})
        </Text>
        <Text>Request Type: {item.req_type === 0 ? 'Outing' : 'Leave'}</Text>
        <Text>Out Since: {item.out_since}</Text>
        <Text>Visit To: {item.visit_to}</Text>
      </View>
    );
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
        data={this.state.studentList}
        renderItem={({item, index}) => this.renderItem(item, index)}
        keyExtractor={item => 'item_' + item.student_id}
        ListEmptyComponent={this.displayEmptyList()}
        extraData={this.state.refreshList}
      />
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
  itemContainer: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginBottom: 20,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 15,
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

export default AdminStudentNotInCampus;
