import { AUTH_SUCCESS, AUTH_ERROR } from './types';

export const authSuccess = ({
  firstName,
  lastName,
  _id,
  email,
  token
}) => dispatch => {
  const user = { firstName, lastName, _id, email };

  dispatch({ type: AUTH_SUCCESS, payload: { user, token } });
};

export const authError = () => dispatch => dispatch({
  type: AUTH_ERROR
});
