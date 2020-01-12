import {combineReducers} from 'redux';
import {
  LOG_IN_SUCCESS,
  LOG_IN_REJECTED,
  LOG_IN_SENT,
  REGISTER_SUCCESS,
  REGISTER_REJECTED,
  REGISTER_SENT,
} from './actions';

const merge = (a, b) => {
  return Object.assign({}, a, b);
};
const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOG_IN_SENT:
      return merge(state, {loginMsg: ''});
    case LOG_IN_SUCCESS:
      return merge(state, {token: action.payload});
    case LOG_IN_REJECTED:
      return merge(state, {loginMsg: action.payload, loginMsgType: 'error'});
    case REGISTER_SENT:
      return merge(state, {registerMsg: ''});
    case REGISTER_SUCCESS:
      return merge(state, {
        token: action.payload.token,
        registerMsg: action.payload.msg,
        registerMsgType: 'success',
      });
    case REGISTER_REJECTED:
      return merge(state, {
        registerMsg: action.payload,
        registerMsgType: 'error',
      });
    default:
      return state;
  }
};
// const reducer = combineReducers({loginReducer});
export default reducer;
