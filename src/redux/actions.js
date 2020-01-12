import {login} from '../apis/login';
import {register} from '../apis/register';
//Action Types
export const LOG_IN_SENT = 'LOG_IN_SENT';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_REJECTED = 'LOG_IN_REJECTED';

export const REGISTER_SENT = 'REGISTER_SENT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_REJECTED = 'REGISTER_REJECTED';

//Action Creators
export const loginUser = (regno, password) => async dispatch => {
  console.log('Login Fired');
  dispatch({type: LOG_IN_SENT});
  try {
    const token = await login(regno, password);
    dispatch({type: LOG_IN_SUCCESS, payload: token});
  } catch (err) {
    console.log('actions, login rejected: ', err.message);
    dispatch({type: LOG_IN_REJECTED, payload: err.message});
  }
};
export const registerUser = (
  email,
  name,
  password,
  password_confirmation,
  regno,
  type = 'student',
) => async dispatch => {
  dispatch({type: REGISTER_SENT});
  try {
    const token = await register(
      email,
      name,
      password,
      password_confirmation,
      regno,
      type,
    );
    dispatch({type: REGISTER_SUCCESS, payload: token});
  } catch (err) {
    dispatch({type: REGISTER_REJECTED, payload: err.message});
  }
};
