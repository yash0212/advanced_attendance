import {login} from '../apis/login';

//Action Types
export const LOG_IN_SENT = 'LOG_IN_SENT';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_REJECTED = 'LOG_IN_REJECTED';

//Action Creators
export const loginUser = (regno, password) => async dispatch => {
  dispatch({type: LOG_IN_SENT});
  try {
    const token = await login(regno, password);
    dispatch({type: LOG_IN_SUCCESS, payload: token});
  } catch (err) {
    console.log(err.message);
    dispatch({type: LOG_IN_REJECTED, payload: err.message});
  }
};
