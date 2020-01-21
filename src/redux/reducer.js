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
  UPDATE_OUTING_SENT,
  UPDATE_OUTING_SUCCESS,
  UPDATE_OUTING_REJECTED,
  UPDATE_LEAVE_SENT,
  UPDATE_LEAVE_SUCCESS,
  UPDATE_LEAVE_REJECTED,
  APPLY_LEAVE_SENT,
  APPLY_LEAVE_SUCCESS,
  APPLY_LEAVE_REJECTED,
  APPLY_OUTING_SENT,
  APPLY_OUTING_SUCCESS,
  APPLY_OUTING_REJECTED,
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
        updateOutingMsg: '',
        updateOutingMsgType: '',
        updateLeaveMsg: '',
        updateLeaveMsgType: '',
        applyLeaveMsg: '',
        applyOutingMsg: '',
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
    case UPDATE_OUTING_SENT:
      return merge(state, {updateOutingMsg: '', updateOutingMsgType: ''});
    case UPDATE_OUTING_SUCCESS:
      return merge(state, {
        updateOutingMsgType: action.payload.updateOutingMsgType,
        updateOutingMsg: action.payload.msg,
        outingRequests: action.payload.outingRequests,
      });
    case UPDATE_OUTING_REJECTED:
      return merge(state, {
        updateOutingMsgType: 'error',
        updateOutingMsg: action.payload,
      });
    case UPDATE_LEAVE_SENT:
      return merge(state, {updateLeaveMsg: '', updateLeaveMsgType: ''});
    case UPDATE_LEAVE_SUCCESS:
      return merge(state, {
        updateLeaveMsgType: action.payload.updateLeaveMsgType,
        updateLeaveMsg: action.payload.msg,
        leaveRequests: action.payload.leaveRequests,
      });
    case UPDATE_LEAVE_REJECTED:
      return merge(state, {
        updateLeaveMsgType: 'error',
        updateLeaveMsg: action.payload,
      });
    case APPLY_LEAVE_SENT:
      return merge(state, {applyLeaveMsg: '', loading: true});
    case APPLY_LEAVE_SUCCESS:
      return merge(state, {
        applyLeaveMsg: action.payload.msg,
        loading: false,
      });
    case APPLY_LEAVE_REJECTED:
      return merge(state, {
        applyLeaveMsg: action.payload,
        loading: false,
      });
    case APPLY_OUTING_SENT:
      return merge(state, {applyOutingMsg: '', loading: true});
    case APPLY_OUTING_SUCCESS:
      return merge(state, {
        applyOutingMsg: action.payload.msg,
        loading: false,
      });
    case APPLY_OUTING_REJECTED:
      return merge(state, {
        applyOutingMsg: action.payload,
        loading: false,
      });
    default:
      return state;
  }
};
// const reducer = combineReducers({authReducer, leaveOutingReducer});
export default reducer;
