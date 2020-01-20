import {login} from '../apis/login';
import {register} from '../apis/register';
import {fetchOuting} from '../apis/fetchouting';
import {fetchLeave} from '../apis/fetchleave';
//Action Types
export const RESET_MSG = 'RESET_MSG';

export const LOG_IN_SENT = 'LOG_IN_SENT';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_REJECTED = 'LOG_IN_REJECTED';

export const REGISTER_SENT = 'REGISTER_SENT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_REJECTED = 'REGISTER_REJECTED';

export const LOGOUT = 'LOGOUT';

export const FETCH_OUTING_SENT = 'FETCH_OUTING_SENT';
export const FETCH_OUTING_SUCCESS = 'FETCH_OUTING_SUCCESS';
export const FETCH_OUTING_REJECTED = 'FETCH_OUTING_REJECTED';
export const FETCH_LEAVE_SENT = 'FETCH_LEAVE_SENT';
export const FETCH_LEAVE_SUCCESS = 'FETCH_LEAVE_SUCCESS';
export const FETCH_LEAVE_REJECTED = 'FETCH_LEAVE_REJECTED';

//Action Creators
export const loginUser = (regno, password) => async dispatch => {
  // console.log('Login Fired');
  dispatch({type: LOG_IN_SENT});
  try {
    const data = await login(regno, password);
    // console.log('action login success: ', data);
    dispatch({type: LOG_IN_SUCCESS, payload: data});
  } catch (err) {
    // console.log('actions, login rejected: ', err.message);
    dispatch({type: LOG_IN_REJECTED, payload: err.message});
  }
};
export const registerUser = (
  email,
  name,
  password,
  password_confirmation,
  regno,
  type = 1,
) => async dispatch => {
  console.log('sending register request');
  dispatch({type: REGISTER_SENT});
  try {
    const data = await register(
      email,
      name,
      password,
      password_confirmation,
      regno,
      type,
    );
    dispatch({type: REGISTER_SUCCESS, payload: data});
  } catch (err) {
    dispatch({type: REGISTER_REJECTED, payload: err.message});
  }
};

export const resetMsg = () => dispatch => {
  dispatch({type: RESET_MSG});
};

export const fetchOutingRequests = token => async dispatch => {
  console.log('sending fetch outing request');
  dispatch({type: FETCH_OUTING_SENT});
  try {
    const data = await fetchOuting(token);
    // console.log('data is received from server', data);
    dispatch({type: FETCH_OUTING_SUCCESS, payload: data});
  } catch (err) {
    dispatch({type: FETCH_OUTING_REJECTED, payload: err.message});
  }
};

export const fetchLeaveRequests = token => async dispatch => {
  console.log('sending fetch leave request');
  dispatch({type: FETCH_LEAVE_SENT});
  try {
    const data = await fetchLeave(token);
    // console.log('data is received from server', data);
    dispatch({type: FETCH_LEAVE_SUCCESS, payload: data});
  } catch (err) {
    dispatch({type: FETCH_LEAVE_REJECTED, payload: err.message});
  }
};
