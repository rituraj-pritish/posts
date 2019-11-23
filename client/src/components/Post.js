import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  CircularProgress,
  TextField,
  Button,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import {setAlert} from '../actions/alerts'
import { getPostQuery } from '../graphql/queries';
import { addCommentMutation } from '../graphql/mutations';
import CommentsList from './CommentsList';

const useStyles = makeStyles(theme => ({
  commentField: {
    width: '80%',
    display: 'inline-block'
  },
  commentButton: {
    position: 'absolute',
    display: 'block',
    right: 32
  },
  lineBreaks: {
    whiteSpace: 'pre-line'
  }
}));

const Post = props => {
  const classes = useStyles();
  const postId = props.match.params.postId;

  const [comment, setComment] = useState('');
  const { loading, error, data } = useQuery(getPostQuery, {
    variables: { postId }
  });
  const [addComment, addCommentRes] = useMutation(addCommentMutation);

  useEffect(() => {
    if (!addCommentRes.loading && !addCommentRes.error) setComment('');
  }, [addCommentRes.loading, addCommentRes.error]);

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
    thumbsUp
  } = data.getPost;

  const {
    user: { _id: currentUserId }
  } = props.auth;

  const handleSubmit = e => {
    e.preventDefault();

    addComment({
      variables: { content: comment, postId },
      refetchQueries: [
        {
          query: getPostQuery,
          variables: { postId }
        }
      ]
    });
  };

  return (
    <div>
      <Moment format='DD/MM/YYYY'>{date}</Moment>
      <h3>{title}</h3>
      <div className={classes.lineBreaks}>{content}</div>
      Author -{' '}
      {user.firstName.toUpperCase() + ' ' + user.lastName.toUpperCase()}
      thumbs ups : {thumbsUp.length}
      {currentUserId === userId ? 'delete' : null}
      <br />
      <Divider />
      <div>{comments.length} Comments</div>
      <TextField
        fullWidth
        multiline
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <Button className={classes.commentButton} disabled={!comment} onClick={handleSubmit}>Comment</Button>
      <CommentsList postId={postId} comments={comments} />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {setAlert})(Post);
