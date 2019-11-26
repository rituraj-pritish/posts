import React from 'react';
import { connect } from 'react-redux';
import { Grid, IconButton, Avatar, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { useMutation } from '@apollo/react-hooks';
import Moment from 'react-moment';

import { setAlert } from '../../actions/alerts';
import {
  deleteCommentMutation,
  likeCommentMutation,
  unlikeCommentMutation
} from '../../graphql/mutations';
import { getCommentsOfPostQuery } from '../../graphql/queries';

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
    margin: '5px 20px 0 70px'
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
    alignItems: 'center',
    minHeight: '48px'
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
    color: theme.palette.delete
  }
}));

const Comment = ({
  user: { firstName, lastName },
  _id,
  content,
  likes,
  userId,
  postId,
  date,
  setAlert,
  auth
}) => {
  const classes = useStyles();
  const [deleteComment] = useMutation(deleteCommentMutation);
  const [likeComment] = useMutation(likeCommentMutation);
  const [unlikeComment] = useMutation(unlikeCommentMutation);

  const handleDelete = () => {
    deleteComment({
      variables: { postId, commentId: _id },
      refetchQueries: [
        {
          query: getCommentsOfPostQuery,
          variables: { postId }
        }
      ]
    });
  };

  const handleLike = () => {
    const isLiked = likes.find(like => like.userId === auth.user._id);
    if (isLiked) {
      setAlert('Comment already liked', 'warning');
      return;
    }
    likeComment({
      variables: { postId, commentId: _id },
      refetchQueries: [
        {
          query: getCommentsOfPostQuery,
          variables: { postId }
        }
      ]
    });
  };

  const handleUnlike = () => {
    const isLiked = likes.find(like => like.userId === auth.user._id);
    if (!isLiked) {
      setAlert('Comment not yet liked', 'warning');
      return;
    }
    unlikeComment({
      variables: { postId, commentId: _id },
      refetchQueries: [
        {
          query: getCommentsOfPostQuery,
          variables: { postId }
        }
      ]
    });
  };

  return (
    <Grid className={classes.root} container>
      <Grid container alignItems='center'>
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
            onClick={handleUnlike}
          />
        </div>

        {auth.isAuth && (userId === auth.user._id) ? (
          <IconButton onClick={handleDelete}>
            <DeleteRoundedIcon className={classes.delete} />
          </IconButton>
        ) : null}
      </div>
    </Grid>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setAlert }
)(Comment);
