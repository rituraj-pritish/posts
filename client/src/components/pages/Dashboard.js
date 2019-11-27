import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';

import { getUserQuery } from '../../graphql/queries';
import PostsList from '../posts/PostsList';
import Chart from '../Chart';

const useStyles = makeStyles(theme => ({
  link: theme.link,
  text: {
    marginBottom: '20px'
  }
}));

const Dashboard = ({ auth: { user } }) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(getUserQuery, {
    variables: { userId: user._id }
  });

  if (loading) {
    return <CircularProgress />;
  }
  if (error) return <div>Oppps</div>;

  const posts = data.getUser.posts;

  return (
    <div>
      <Typography className={classes.text} >{`Hi ${user.firstName[0].toUpperCase() + user.firstName.slice(1)}, how are you today ?`}</Typography>
      <Grid container direction='row' alignItems='center' justify='center'>
        <Chart />
      </Grid>
      <Grid container justify='center'>
        <Typography className={classes.text} variant='h4'>
          Posts by you
        </Typography>
      </Grid>
      <PostsList posts={posts} />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
