import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  CircularProgress,
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
import { getPostQuery, getClapsOfPostQuery } from '../graphql/queries';
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

  const [addClap, addClapRes] = useMutation(addClapMutation, {
    variables: { postId },
    refetchQueries: [
      {
        query: getClapsOfPostQuery,
        variables: { postId }
      }
    ]
  });
  const [removeClap, removeClapRes] = useMutation(removeClapMutation, {
    variables: { postId },
    refetchQueries: [
      {
        query: getClapsOfPostQuery,
        variables: { postId }
      }
    ]
  });
  const getClaps = useQuery(getClapsOfPostQuery, {
    variables: { postId }
  });
  const { loading, error, data } = useQuery(getPostQuery, {
    variables: { postId }
  });

  const [clapsCount, setClapsCount] = useState(0);

  useEffect(() => {
    if (!loading && !error) {
      setClapsCount(data.getPost.claps.length);
    }

    if(!getClaps.loading && !getClaps.error) {
      setClapsCount(getClaps.data.getClapsOfPost.length)
    }
  }, [removeClapRes.loading, addClapRes.loading, loading, error,getClaps]);

  if (loading) return <CircularProgress />;
  if (error) return <div>Ooops... , Something went wrong</div>;

  const {
    title,
    content,
    user,
    userId,
    date,
    comments,
    claps
  } = data.getPost;

  const {
    user: { _id: currentUserId }
  } = props.auth;

  const isAlreadyClapped = getClaps.data.getClapsOfPost.find(
    clap => clap.userId.toString() === currentUserId
  );

  const handleClapButton = () => {
    if (isAlreadyClapped) {
      removeClap();
    } else {
      addClap();
    }
  };

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
      <Badge badgeContent={clapsCount} color='secondary'>
        <IconButton onClick={handleClapButton}>
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
