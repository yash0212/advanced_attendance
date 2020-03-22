import React, {PureComponent} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';

class DisplayCode extends PureComponent {
  constructor(props) {
    super(props);
  }
  state = {
    code: '',
  };
  componentDidMount() {
    let uid = this.props.navigation.getParam('uid');
    let data = this.props.navigation.getParam('data');

    this.timer = setInterval(() => {
      this.setState({
        code: this.generateCode(
          data.lectureNumber,
          data.subjectId,
          uid,
          data.degreeId,
          data.departmentId,
          data.section,
          data.year,
        ),
      });
    }, 2000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  generateCode(
    lectureNumber,
    subjectId,
    uid,
    degreeId,
    departmentId,
    section,
    year,
  ) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 100; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
    return 'IP3Qy89Aa06BuFbPq0eNakpr6s3pJ%4lUuVUHwd8vf6IuI1eLJ2uxKGKS5MtECJljV888e2HZdhcbzBeiNtTXw7v23hQrKcV76QP';
  }
  renderCode() {
    let code = this.state.code;
    // console.log('code', code);
    var arr = [];
    var res;
    for (let i = 0; i < 10; i++) {
      arr.push([
        code.slice(i * 10, i * 10 + 5),
        code.slice(i * 10 + 5, i * 10 + 10),
      ]);
    }
    return arr.map((x, i) => (
      <Text key={i} style={styles.code}>
        {x[0]} {x[1]}
      </Text>
    ));
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.code !== '' && (
          <View style={styles.codeContainer}>{this.renderCode()}</View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 20,
    backgroundColor: '#dadfe3',
  },
  codeContainer: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 25,
    fontWeight: 'bold',
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
