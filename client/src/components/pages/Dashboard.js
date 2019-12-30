import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { CircularProgress, Grid, Typography, Button } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { getUserQuery } from '../../graphql/queries';
import PostsList from '../posts/PostsList';
import Chart from '../Chart';

const useStyles = makeStyles(theme => ({
  link: { ...theme.link, color: theme.palette.bg },
  text: {
    marginBottom: '20px'
  },
  createPost: {
    background: theme.palette.text.primary,
    [theme.breakpoints.up('md')] : {
      display: 'none',
      pointerEvents: 'none'
    }
  },
  circularLoader: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const Dashboard = ({ auth: { user } }) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(getUserQuery, {
    variables: { userId: user._id }
  });

  if (loading) {
    return <div className={classes.circularLoader}><CircularProgress /></div>;
  }
  if (error) return <div>Ooops, Something went wrong...! Please try again.</div>;

  const posts = data.getUser.posts;

  return (
    <div>
      <Grid container justify='space-between'>
        <Typography
          className={classes.text}
        >{`Hi ${user.firstName[0].toUpperCase() +
          user.firstName.slice(1)}, how are you today ?`}</Typography>
        <Button variant='contained' className={classes.createPost}>
          <Link className={classes.link} to='/create-post'>
            Create Post
          </Link>
        </Button>
      </Grid>
      <Grid container direction='row' alignItems='center' justify='center'>
        <Chart />
      </Grid>
      <Grid container justify='center'>
        <Typography className={classes.text} variant='h4'>
          Posts by you
        </Typography>
      </Grid>
      {posts.length === 0 ? (
        <Typography>No posts from you yet</Typography>
      ) : (
        <PostsList posts={posts} />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
