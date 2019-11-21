import { AUTH_SUCCESS, AUTH_ERROR } from '../actions/types';

const initialState = {
  isAuth: false,
  loading: true,
  user: null,
  token: ''
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload.user,
        token: payload.token
      };
    case AUTH_ERROR:
      return {
        ...state,
        isAuth: false,
        loading: true,
        user: null,
        token: ''
      };
    default:
      return state;
  }
};
