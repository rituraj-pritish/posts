import { AUTH_SUCCESS, AUTH_ERROR, SET_USER, LOGOUT } from './types';

export const authSuccess = ({
  firstName,
  lastName,
  _id,
  email,
  token,
}) => dispatch => {
  const user = { firstName, lastName, _id, email };

  window.localStorage.setItem('token', token);

  dispatch({ type: AUTH_SUCCESS, payload: user });
};

export const logout = () => dispatch => {
  window.localStorage.removeItem('token');
  dispatch({
    type: LOGOUT
  });
};

export const authError = () => dispatch => {
  dispatch({
    type: AUTH_ERROR
  });
};

export const setUser = ({ firstName, lastName, _id, email }) => dispatch => {
  const user = { firstName, lastName, _id, email };

  dispatch({ type: SET_USER, payload: user });
};
