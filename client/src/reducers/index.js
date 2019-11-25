import { combineReducers } from 'redux';

import alertReducer from './alertReducer';
import authReducer from './authReducer';
import themeReducer from './themeReducer';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  theme: themeReducer
});
