import { combineReducers } from 'redux';

import userReducer from './userReducer';
import themeReducer from './themeReducer';
import postsReducer from './postsReducer';

export default combineReducers({
  user: userReducer,
  theme: themeReducer,
  posts: postsReducer
});
