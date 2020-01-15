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
    default:
      return state;
  }
};
// const reducer = combineReducers({loginReducer});
export default reducer;
