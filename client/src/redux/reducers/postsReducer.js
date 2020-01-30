import {
  ADD_TAG,
  REMOVE_TAGS,
  ADD_FILTERED,
  REMOVE_FILTERED,
  SET_POSTS
} from '../types';

const initialState = {
  filtered: [],
  mostViewed: [],
  mostClapped: [],
  popular: [],
  posts: [],
  selectedTags: [],
  loading: true
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_POSTS:
      return {
        ...state,
        posts: payload.sort((a, b) => new Date(b.date) - new Date(a.date)),
        loading: false
      };
    case ADD_TAG:
      const alreadyThere = state.selectedTags.find(tag => tag === payload);
      if (alreadyThere) return { ...state };
      const { posts, selectedTags } = state;
      selectedTags.push(payload);
      let filtered;
      if (
        state.posts.filter(post => post.tags.includes(payload)).length === 0
      ) {
        filtered = [];
      } else if (selectedTags.length === 1) {
        filtered = state.posts.filter(post => post.tags.includes(payload));
      } else {
        filtered = state.filtered.concat(
          selectedTags.map(tag => posts.filter(post => post.tags.includes(tag)))
        );
      }
      return {
        ...state,
        selectedTags: selectedTags,
        filtered: Array.from(new Set([].concat(...filtered)))
      };
    case REMOVE_TAGS:
      return {
        ...state,
        selectedTags: []
      };
    case ADD_FILTERED:
      let filter;
      if (payload.sortType === 'claps') {
        filter = payload.posts.sort((a, b) => b.claps.length - a.claps.length);
      }

      if (payload.sortType === 'views') {
        filter = payload.posts.sort((a, b) => b.views - a.views);
      }

      if (payload.sortType === 'date') {
        filter = payload.posts.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      }

      return {
        ...state,
        filtered: filter
      };
    case REMOVE_FILTERED:
      return {
        ...state,
        filtered: []
      };
    default:
      return state;
  }
};
