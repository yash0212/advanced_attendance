import React, {PureComponent} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import Encrypto from '../../helpers/Encrypto';

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
    }, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  generateCode = (
    lectureNumber,
    subjectId,
    uid,
    degreeId,
    departmentId,
    section,
    year,
  ) => {
    let enc = new Encrypto();

    return enc.getCode(
      lectureNumber,
      subjectId,
      uid,
      degreeId,
      departmentId,
      section,
      year,
      1,
    );
  };
  renderCode() {
    let code = this.state.code;
    // console.log('code', code);
    var arr = [];
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
