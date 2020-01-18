import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchOutingRequests} from '../../redux/actions';

class DisplayLeaveOutingCode extends PureComponent {
  constructor(props) {
    super(props);
  }
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.outingRequests) {
      return {outingRequests: nextProps.outingRequests, loading: false};
    } else {
      return null;
    }
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.outingRequests) {
  //     console.log(this.state.outingRequests);
  //   }
  // }
  renderOutingRequests = () => {
    if (this.props.outingRequests) {
      return this.props.outingRequests.map((req, index) =>
        this.renderRequest(req, index),
      );
    }
    return null;
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>THis is some really random code</Text>
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
  outing: {
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
  },
});

const mapStateToProps = state => ({
  err: state.outingErr,
  outingRequests: state.outingRequests,
  token: state.token,
});
export default connect(mapStateToProps, {fetchOutingRequests})(
  DisplayLeaveOutingCode,
);
