import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { getUserQuery } from '../graphql/queries';
import PostsList from './PostsList';
import Chart from './Chart';

const Dashboard = ({ auth: { user } }) => {
  const { loading, error, data } = useQuery(getUserQuery, {
    variables: { userId: user._id }
  });

  if (loading) {
    return <CircularProgress />;
  }
  if (error) return <div>Oppps</div>;

  const posts = data.getUser.posts

  const mostViewedPost = posts.sort((a,b) => b.views - a.views)[0].title

  const mostClappedPost = posts.sort((a,b) => b.claps.length - a.claps.length)[0].title

  return (
    <div>
      {`Hi ${user.firstName}, how are you today ?`}
      <Grid container alignItems='center' >
        <Grid item>
          Most Viewed Post : {mostViewedPost}
          <br/>
          Most Clapped Post: {mostClappedPost}
        </Grid>
        <Grid item>
        <Chart/>
        </Grid>
      </Grid>
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
      <PostsList posts={posts} />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
