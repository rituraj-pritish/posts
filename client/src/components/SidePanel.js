import React from 'react';
import {
  Grid,
  Container,
  Button,
  Typography,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PostsList from './posts/PostsList';
import PostItem from './posts/PostItem';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    overflow: 'hidden',
    overflowWrap: 'break-word',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    textAlign: 'center'
  },
  link: { ...theme.link, color: theme.palette.bg },
  newpost: {
    background: theme.palette.text.primary,
    width: '100%'
  },
  text: {
    color: theme.palette.primary.dark,
    margin: '20px 0'
  },
  postItem: {
    textAlign: 'center',
    margin: '10px 0'
  }
}));

const SidePanel = ({ auth, posts, history }) => {
  const classes = useStyles();

  if (posts.loading) return null;

  const userPosts = posts.posts.filter(post => post.userId === auth.user._id);

  const mostViewed = userPosts.sort((a, b) => b.views - a.views)[0];
  const mostClapped = userPosts.sort(
    (a, b) => b.claps.length - a.claps.length
  )[0];

  console.log(userPosts);

  const onlyForDashboard = (
    <div>
      <Typography className={classes.text}>Most Popular Post</Typography>
      <PostItem className={classes.postItem} {...mostViewed} />
      <Typography className={classes.text}>Most Clapped Post</Typography>
      <PostItem className={classes.postItem} {...mostClapped} />
    </div>
  );

  const others = (
    <div>
      <Typography className={classes.text}>Most popular posts</Typography>
      {posts.posts
        .sort((a, b) => b.views - a.views)
        .map(post => (
          <div>
            <PostItem className={classes.postItem} {...post} key={post._id} />
            <span style={{ margin: '20px' }} />
          </div>
        ))}
    </div>
  );

  return (
    <Grid className={`${classes.root} side-panel`} item md={4}>
      <Container>
        {auth.isAuth && (
          <div>
            <Button className={classes.newpost} variant='contained'>
              <Link className={classes.link} to='/create-post'>
                New Post
              </Link>
            </Button>
          </div>
        )}
        {history.location.pathname === '/dashboard' ? onlyForDashboard : others}
      </Container>
    </Grid>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts
});

export default withRouter(connect(mapStateToProps)(SidePanel));
