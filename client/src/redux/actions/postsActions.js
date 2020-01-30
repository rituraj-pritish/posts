import {
  ADD_FILTERED,
  REMOVE_FILTERED,
  ADD_TAG,
  REMOVE_TAGS,
  SET_POSTS
} from '../types';

export const setPosts = posts => ({
  type: SET_POSTS,
  payload: posts
});

export const filterPosts = (sortType,posts) => (dispatch, getState) => {
  // console.log(getState().posts);
  dispatch({type: ADD_FILTERED, payload: {sortType,posts} })
};

export const clearFilter = () => ({
  type: REMOVE_FILTERED
});

export const addTag = tag => ({
  type: ADD_TAG,
  payload: tag
});

export const removeTags = () => dispatch => {
  dispatch({ type: REMOVE_TAGS });
  dispatch({ type: REMOVE_FILTERED });
};
