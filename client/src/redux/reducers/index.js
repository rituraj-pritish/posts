import { combineReducers } from 'redux';

import alertReducer from './alertReducer';
import authReducer from './authReducer';
import themeReducer from './themeReducer';
import postsReducer from './postsReducer';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  theme: themeReducer,
  posts: postsReducer
});
