import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { getUserQuery } from '../graphql/queries';
import PostsList from './PostsList';

const Dashboard = ({ auth: { user } }) => {
  const { loading, error, data } = useQuery(getUserQuery, {
    variables: { userId: user._id }
  });

  if (loading) {
    return <CircularProgress />;
  }

  if (error) return <div>Oppps</div>;

  return (
    <div>
      {`Hi ${user.firstName}, how are you today ?`}
      filter by drop down
      <Button variant='contained'>
        <Link to='/create-post'>New Post</Link>
      </Button>
      <br />
      visitor count graph
      <br />
      some other data
      <br />
      my posts and their individual views
      <PostsList posts={data.getUser.posts} />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
