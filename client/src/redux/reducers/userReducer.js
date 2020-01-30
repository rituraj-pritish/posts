import { AUTH_SUCCESS, AUTH_ERROR, SET_USER, LOGOUT } from '../types';

const initialState = {
  isAuth: false,
  loading: true,
  user: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload
      };
    case SET_USER:
      return {
        ...state,
        loading: false,
        isAuth: true,
        user: payload
      };
    case LOGOUT:
    case AUTH_ERROR:
      return {
        ...state,
        isAuth: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};
