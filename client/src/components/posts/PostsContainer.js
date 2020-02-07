import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PostsItem from './PostsItem';

const PostsContainer = ({ posts, loading }) => {
  if (loading && posts.length === []) return 'component loader';
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

const mapStateToProps = state => ({
  posts: state.posts.posts,
  loading: state.posts.loading
});

export default connect(mapStateToProps)(PostsContainer);
