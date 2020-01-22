import React, {PureComponent} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';

class DisplayCode extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>The QR is displayed here</Text>
      </View>
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
});

const mapStateToProps = state => ({
  err: state.leaveErr,
  leaveRequests: state.leaveRequests,
  token: state.token,
  loading: state.loading,
});
// export default connect(mapStateToProps, {fetchLeaveRequests})(DisplayCode);
export default connect(null, null)(DisplayCode);
