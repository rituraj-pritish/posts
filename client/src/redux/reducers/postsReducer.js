import {
  ADD_TAG,
  REMOVE_TAGS,
  ADD_FILTERED,
  REMOVE_FILTERED,
  SET_POSTS,
  SET_TRENDING_POSTS
} from '../types';

const initialState = {
  filtered: [],
  mostViewed: [],
  mostClapped: [],
  trending: JSON.parse(localStorage.getItem('trending')) || [],
  posts: [],
  currentPosts: [],
  selectedTags: [],
  loading: true
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case SET_TRENDING_POSTS:
      return {
        ...state,
        trending: payload,
        loading: false
      };
    default:
      return state;
  }
};
