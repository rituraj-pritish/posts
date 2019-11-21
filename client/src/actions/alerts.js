import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (message, variant, timeout) => dispatch => {
  dispatch({ type: SET_ALERT, payload: { message, variant } });

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT
    });
  }, timeout || 3000);
};

export const removeAlert = () => dispatch => {
  dispatch({
    type: REMOVE_ALERT
  });
};
