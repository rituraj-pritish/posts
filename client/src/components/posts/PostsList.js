import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PostItem from './PostItem';

const useStyles = makeStyles(theme => ({
  gridContainer: {
    justifyContent: 'center'
  },
  gridItem: {
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {}
  }
}));

const PostsList = ({ posts }) => {
  const classes = useStyles();

  if(posts.length === 0) {
    return <Typography>No posts from you yet...</Typography>
  }

  const render = posts.map(post => (
    <Grid
      key={post._id}
      className={classes.gridItem}
      item
      md={6}
      sm={6}
      xs={10}
    >
      <Paper>
        <PostItem {...post} key={post._id} />
      </Paper>
    </Grid>
  ));

  return (
    <Grid className={classes.gridContainer} container spacing={4}>
      {render}
    </Grid>
  );
};

export default PostsList;
