import {combineReducers} from 'redux';
import {
  RESET_MSG,
  LOG_IN_SUCCESS,
  LOG_IN_REJECTED,
  LOG_IN_SENT,
  REGISTER_SUCCESS,
  REGISTER_REJECTED,
  REGISTER_SENT,
  LOGOUT,
  FETCH_OUTING_SENT,
  FETCH_OUTING_SUCCESS,
  FETCH_OUTING_REJECTED,
  FETCH_LEAVE_SENT,
  FETCH_LEAVE_SUCCESS,
  FETCH_LEAVE_REJECTED,
} from './actions';

const merge = (a, b) => {
  return Object.assign({}, a, b);
};
const reducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_MSG:
      return merge(state, {
        loginMsg: '',
        loginMsgType: '',
        registerMsg: '',
        registerMsgType: '',
        outingErr: '',
      });
    case LOG_IN_SENT:
      return merge(state, {loginMsg: '', loginMsgType: ''});
    case LOG_IN_SUCCESS:
      return merge(state, {
        user: action.payload.user,
        token: action.payload.token,
      });
    case LOG_IN_REJECTED:
      return merge(state, {loginMsg: action.payload, loginMsgType: 'error'});
    case REGISTER_SENT:
      console.log('register sent dispatched');
      return merge(state, {registerMsg: '', registerMsgType: ''});
    case REGISTER_SUCCESS:
      if (action.payload.user.user_type === 1) {
        return merge(state, {
          user: action.payload.user,
          token: action.payload.token,
          registerMsg: action.payload.msg,
          registerMsgType: 'success',
        });
      } else {
        return merge(state, {
          registerMsg: action.payload.msg,
          registerMsgType: 'success',
        });
      }
    case REGISTER_REJECTED:
      return merge(state, {
        registerMsg: action.payload,
        registerMsgType: 'error',
      });
    case LOGOUT:
      return merge(state, {token: undefined, user: undefined});
    case FETCH_OUTING_SENT:
      return merge(state, {
        loading: true,
        outingErr: '',
      });
    case FETCH_OUTING_SUCCESS:
      return merge(state, {
        outingErr: '',
        outingRequests: action.payload,
        loading: false,
      });
    case FETCH_OUTING_REJECTED:
      return merge(state, {outingErr: action.payload, loading: false});
    case FETCH_LEAVE_SENT:
      return merge(state, {
        loading: true,
        leaveErr: '',
      });
    case FETCH_LEAVE_SUCCESS:
      return merge(state, {
        leaveErr: '',
        leaveRequests: action.payload,
        loading: false,
      });
    case FETCH_LEAVE_REJECTED:
      return merge(state, {leaveErr: action.payload, loading: false});
    default:
      return state;
  }
};
// const reducer = combineReducers({authReducer, leaveOutingReducer});
export default reducer;
