import React from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';

import { getPostsQuery } from '../graphql/queries';
import PostsList from './PostsList';

const Home = ({ auth }) => {
  const { loading, error, data } = useQuery(getPostsQuery);

  if (loading) return <CircularProgress />;

  if (error) return <div>Oooops... Something went wrong. Please try again</div>;

  return (
    <div>
      filter by drop down
      <PostsList posts={data.getPosts} />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
