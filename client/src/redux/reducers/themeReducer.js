import { CHANGE_THEME } from '../types';

const theme = window.localStorage.getItem('isLight');

const initialState = {
  isLight: theme === 'false' ? false : true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type){
    case CHANGE_THEME:
      return {
        isLight: !state.isLight,
      };
    default:
      return state;
  }
};
