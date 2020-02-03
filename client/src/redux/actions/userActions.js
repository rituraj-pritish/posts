import { store } from 'react-notifications-component';

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

export const setAlert = (message, type) => {
  let title;
  switch (type) {
    case 'danger':
      title = 'Error';
      break;
    case 'success':
      title = 'Success';
      break;
    default:
      title = '';
  }
  const notification = {
    title: title,
    insert: 'top',
    container: 'bottom-center',
    dismiss: {
      duration: 2000
    },
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut']
  };

  store.addNotification({
    ...notification,
    message: message,
    type: type
  });

  return { type: 'set_alert' };
};
