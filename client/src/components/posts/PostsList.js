import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PostItem from './PostItem';

const useStyles = makeStyles(theme => ({
  gridItem: {
    textAlign: 'center',
  }
}));

const PostsList = ({ posts }) => {
  const classes = useStyles();

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
    <Grid container spacing={4} justify='center'>
      {render}
    </Grid>
  );
};

export default PostsList;
