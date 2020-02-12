import React from 'react';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';

import setAlert from 'src/utils/setAlert';
import {
  likeCommentMutation,
  unlikeCommentMutation,
  deleteCommentMutation
} from 'src/graphql/mutations/postMutations';
import { getCommentsOfPostQuery } from 'src/graphql/queries/postQueries';

import Comment from './Comment';

const CommentContainer = props => {
  const { comment, postId, isAuth, user } = props;
  const {
    _id: commentId,
    user: { _id: userId },
    likes
  } = comment;

  const [
    likeComment,
    { loading: likeLoading, error: likeError, data: likeData }
  ] = useMutation(likeCommentMutation, {
    variables: {
      postId,
      commentId
    },
    refetchQueries: [
      {
        query: getCommentsOfPostQuery,
        variables: { postId }
      }
    ]
  });

  const [
    unlikeComment,
    { loading: unlikeLoading, error: unlikeError, data: unlikeData }
  ] = useMutation(unlikeCommentMutation, {
    variables: {
      postId,
      commentId
    },
    refetchQueries: [
      {
        query: getCommentsOfPostQuery,
        variables: { postId }
      }
    ]
  });

  const [
    deleteComment,
    { loading: deleteLoading, error: deleteError, data: deleteData }
  ] = useMutation(deleteCommentMutation, {
    variables: {
      postId,
      commentId
    },
    refetchQueries: [
      {
        query: getCommentsOfPostQuery,
        variables: { postId }
      }
    ]
  });

  let isLiked = false;
  if (isAuth) isLiked = likes.find(like => like.userId.toString() === user._id);

  const handleLike = () => {
    if (!isAuth) {
      setAlert('Login to continue', 'danger');
      return;
    } else {
      if (isLiked) {
        setAlert('Comment already liked', 'danger');
        return;
      }
      likeComment();
    }
  };

  const handleUnlike = () => {
    if (!isAuth) {
      setAlert('Login to continue', 'danger');
      return;
    } else {
      if (!isLiked) {
        setAlert('Comment not liked yet', 'danger');
        return;
      }
      unlikeComment();
    }
  };

  const handleDelete = () => {
    deleteComment();
  };

  let isAuthorOfComment = false;
  if (isAuth) isAuthorOfComment = userId.toString() === user._id;

  return (
    <Comment
      like={handleLike}
      unlike={handleUnlike}
      deleteComment={handleDelete}
      postId={postId}
      isAuthor={isAuthorOfComment}
      {...comment}
    />
  );
};

const mapStateToProps = state => ({
  isAuth: state.user.isAuth,
  user: state.user.user
});

export default connect(mapStateToProps)(CommentContainer);
