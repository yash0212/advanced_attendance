import {combineReducers} from 'redux';
import {
  LOG_IN_SUCCESS,
  LOG_IN_REJECTED,
  loginUser,
  LOG_IN_SENT,
} from './actions';

const merge = (a, b) => {
  return Object.assign({}, a, b);
};
const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOG_IN_SENT:
      return state;
    case LOG_IN_SUCCESS:
      return merge(state, {token: action.payload});
    case LOG_IN_REJECTED:
      return merge(state, {loginErr: action.payload});
    default:
      return state;
  }
};
const reducer = combineReducers({user: loginReducer});
export default reducer;
