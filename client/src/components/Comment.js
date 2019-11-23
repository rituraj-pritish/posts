import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, IconButton, Avatar, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { useMutation } from '@apollo/react-hooks';
import Moment from 'react-moment';

import { setAlert } from '../actions/alerts';
import {
  deleteCommentMutation,
  likeCommentMutation,
  unlikeCommentMutation
} from '../graphql/mutations';
import { getPostQuery } from '../graphql/queries';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '20px 5px'
  },
  name: {
    fontWeight: 'bold'
  },
  comment: {
    whiteSpace: 'pre-line',
    width: '100%',
    overflowWrap: 'break-word',
    margin: '12px 20px 0 54px'
  },
  avatar: {
    margin: '0 10px',
    height: '50px',
    width: '50px'
  },
  commentDate: {
    marginLeft: '10px',
    fontSize: '15px',
    color: '#9ea3a0'
  },
  bottom: {
    marginLeft: '70px',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  thumbs: {
    width: '100px',
    display: 'flex',
    justifyContent: 'space-between',
    color: '#9ea3a0'
  },
  thumb: {
    cursor: 'pointer'
  },
  likes: {
    margin: '5px',
    marginLeft: '-10px'
  },
  delete: {
    color: '#db6565'
  }
}));

const Comment = ({
  user: { firstName, lastName },
  _id,
  content,
  likes,
  postId,
  date,
  setAlert
}) => {
  const classes = useStyles();
  const [deleteComment] = useMutation(deleteCommentMutation);
  const [likeComment, likeRes] = useMutation(likeCommentMutation);
  const [unlikeComment, unlikeRes] = useMutation(unlikeCommentMutation, {
    variables: { postId, commentId: _id },
    refetchQueries: [
      {
        query: getPostQuery,
        variables: { postId }
      }
    ]
  });

  useEffect(() => {
    if (likeRes.error || unlikeRes.error) {
      const err = likeRes.error || unlikeRes.error;
      setAlert(err.graphQLErrors[0].message, 'warning');
    }
  }, [likeRes.error, unlikeRes.error, likeRes.loading, unlikeRes.loading]);

  const handleDelete = () => {
    deleteComment({
      variables: { postId, commentId: _id },
      refetchQueries: [
        {
          query: getPostQuery,
          variables: { postId }
        }
      ]
    });
  };

  const handleLike = () => {
    likeComment({
      variables: { postId, commentId: _id },
      refetchQueries: [
        {
          query: getPostQuery,
          variables: { postId }
        }
      ]
    });
  };

  return (
    <Grid className={classes.root} container>
      <Grid item>
        <Avatar className={classes.avatar}>
          {firstName[0].toUpperCase() + lastName[0].toUpperCase()}
        </Avatar>
      </Grid>
      <Grid item>
        <div className={classes.name}>
          {firstName[0].toUpperCase() +
            firstName.slice(1) +
            ' ' +
            lastName[0].toUpperCase() +
            lastName.slice(1)}
        </div>
      </Grid>
      <Grid item>
        <Moment className={classes.commentDate} fromNow>
          {date}
        </Moment>
      </Grid>

      <div className={classes.comment}>{content}</div>

      <div className={classes.bottom}>
        <div className={classes.thumbs}>
          <Icon
            className={`fas fa-thumbs-up ${classes.thumb} `}
            onClick={handleLike}
          />
          <span className={classes.likes}>
            {likes.length > 0 && likes.length}
          </span>

          <Icon
            className={`fas fa-thumbs-down ${classes.thumb} `}
            onClick={unlikeComment}
          />
        </div>

        <IconButton onClick={handleDelete}>
          <DeleteRoundedIcon className={classes.delete} />
        </IconButton>
      </div>
    </Grid>
  );
};

export default connect(
  null,
  { setAlert }
)(Comment);
