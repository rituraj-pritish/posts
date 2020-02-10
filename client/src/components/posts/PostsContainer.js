import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PostsItem from './PostsItem';

const PostsContainer = ({ posts }) => {
  return (
    <div>
      {posts.map(post => (
        <Link to={`/post/${post._id}`} key={post._id}>
          <PostsItem {...post} />
        </Link>
      ))}
    </div>
  );
};

PostsContainer.propTypes = {
  posts: PropTypes.array
};

PostsContainer.defaultProps = {
  posts: []
};

export default PostsContainer;
