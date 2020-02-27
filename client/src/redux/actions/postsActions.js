import {
  ADD_FILTERED,
  REMOVE_FILTERED,
  SET_TRENDING_POSTS,
  ADD_TAG,
  REMOVE_TAGS,
  SET_POSTS
} from '../types';

export const setPosts = posts => ({
  type: SET_POSTS,
  payload: posts
});

export const setTrendingPosts = posts => {
  localStorage.setItem('trending', JSON.stringify(posts));
  return {
    type: SET_TRENDING_POSTS,
    payload: posts
  };
};

export const filterPosts = (sortType, posts) => (dispatch, getState) => {
  dispatch({ type: ADD_FILTERED, payload: { sortType, posts } });
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
