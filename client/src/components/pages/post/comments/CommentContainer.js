import React from 'react';
import Comment from './Comment';
import { useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';

import { setAlert } from '../../../../redux/actions/userActions';
import {
  likeCommentMutation,
  unlikeCommentMutation,
  deleteCommentMutation
} from '../../../../graphql/mutations/postMutations';
import { getCommentsOfPostQuery } from '../../../../graphql/queries/postQueries';

const CommentContainer = props => {
  const { comment, postId, isAuth, user, setAlert } = props;
  const {
    _id: commentId,
    user: { _id: userId }
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

  if (likeError) setAlert(likeError.graphQLErrors[0].message, 'danger');
  if (unlikeError) setAlert(unlikeError.graphQLErrors[0].message, 'danger');
  if (deleteError) setAlert(deleteError.graphQLErrors[0].message, 'danger');

  const handleLike = () => {
    if (!isAuth) {
      setAlert('Login to continue', 'danger');
      return;
    } else {
      likeComment();
    }
  };

  if (likeError) console.log(likeError);

  const handleUnlike = () => {
    if (!isAuth) {
      setAlert('Login to continue', 'danger');
      return;
    } else {
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

export default connect(mapStateToProps, { setAlert })(CommentContainer);
