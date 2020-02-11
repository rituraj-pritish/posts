import { AUTH_SUCCESS, AUTH_ERROR, SET_USER, LOGOUT } from '../types';

export const authSuccess = data => dispatch => {
  if (data.token) {
    window.localStorage.setItem('token', data.token);
  }

  dispatch({ type: AUTH_SUCCESS, payload: data });
};

export const signout = () => dispatch => {
  window.localStorage.removeItem('token');
  dispatch({
    type: LOGOUT
  });
};

export const authError = () => async dispatch => {
  dispatch({
    type: AUTH_ERROR
  });
};
