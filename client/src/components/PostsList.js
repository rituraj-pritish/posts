import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress, Grid, Paper, CardContent } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'

import { getPostsQuery } from '../graphql/queries';
import PostItem from './PostItem';

const useStyles = makeStyles(theme => ({
  gridContainer: {
    justifyContent: 'center'
  },
  gridItem: {
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {

    }
  }
}))

const PostsList = () => {
  const classes = useStyles()
  const { loading, error, data } = useQuery(getPostsQuery);

  if (loading) return <CircularProgress />;

  if (error) return <div>Oooops... Something went wrong. Please try again</div>;

  const render = data.getPosts.map(post => (
    <Grid className={classes.gridItem}  wrap item md={4} sm={6} xs={10}>
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
