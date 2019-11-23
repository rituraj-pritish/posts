import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import PostsList from './PostsList';

const Dashboard = ({ auth: { loading, user } }) => {
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      {`Hi ${user.firstName}, how are you today ?`}
      <PostsList />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
