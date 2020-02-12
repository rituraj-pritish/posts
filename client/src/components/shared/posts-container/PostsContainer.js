import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PostItem from './PostItem';

const PostsContainer = ({ posts }) => {
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

export default PostsContainer;
