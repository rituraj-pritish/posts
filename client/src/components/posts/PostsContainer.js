import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PostItem from './PostItem';

const PostsContainer = ({ posts }) => {
  useEffect(() => {}, [posts]);
  return (
    <div>
      {posts.map(post => (
        <Link to={`/post/${post._id}`} key={post._id}>
          <PostItem {...post} />
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
