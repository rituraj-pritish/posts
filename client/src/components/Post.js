import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  CircularProgress,
  TextField,
  IconButton,
  Icon,
  Divider,
  Grid,
  Container,
  Badge
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import { setAlert } from '../actions/alerts';
import { getPostQuery, getCommentsOfPostQuery } from '../graphql/queries';
import { addClapMutation, removeClapMutation } from '../graphql/mutations';
import CommentsList from './CommentsList';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '30px'
  },
  divider: {
    height: '2px',
    backgroundColor: 'rgba(0,0,0,0.5)',
    margin: '10px 0'
  },
  lineBreaks: {
    whiteSpace: 'pre-line'
  },
  commentsList: {
    marginTop: '20px'
  }
}));

const Post = props => {
  const classes = useStyles();
  const postId = props.match.params.postId;

  const [addClap, addClapRes] = useMutation(addClapMutation);
  const [removeClap, removeClapRes] = useMutation(removeClapMutation);
  const { loading, error, data } = useQuery(getPostQuery, {
    variables: { postId }
  });

  if (loading) return <CircularProgress />;
  if (error) return <div>Ooops... , Something went wrong</div>;

  const {
    title,
    content,
    user,
    userId,
    date,
    comments,
    likes,
    claps
  } = data.getPost;

  const {
    user: { _id: currentUserId }
  } = props.auth;

  return (
    <Container className={classes.root}>
      <Grid container justify='space-between'>
        <Grid item>
          <Moment format='DD/MM/YYYY'>{date}</Moment>
        </Grid>
        <Grid item>edit and delete buttons</Grid>
      </Grid>
      <Grid container justify='center'>
        <h2>{title}</h2>
      </Grid>
      <div className={classes.lineBreaks}>{content}</div>
      Author -{' '}
      {user.firstName.toUpperCase() + ' ' + user.lastName.toUpperCase()}
      claps : {claps.length}
      {currentUserId === userId ? 'delete' : null}
      <Badge badgeContent={11} color='secondary' >
        <IconButton disabled >
          <Icon className='fas fa-sign-language' />
        </IconButton>
      </Badge>
      <br />
      <Divider className={classes.divider} />
      <div className={classes.commentsList}>
        <CommentsList postId={postId} comments={comments} />
      </div>
    </Container>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setAlert }
)(Post);
