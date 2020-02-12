import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';

import {
  getPostQuery,
  getLikesOfPostQuery
} from 'src/graphql/queries/postQueries';
import {
  likePostMutation,
  unlikePostMutation
} from 'src/graphql/mutations/postMutations';
import Page from 'src/components/ui/Page';
import setAlert from 'src/utils/setAlert';
import ComponentLoader from 'src/components/shared/ComponentLoader';

import Post from './Post';

const PostContainer = ({ match, isAuth, user }) => {
  const postId = match.params.postId;
  const { loading, error, data } = useQuery(getPostQuery, {
    variables: {
      postId
    }
  });

  const {
    loading: likesLoading,
    error: likesError,
    data: likesData
  } = useQuery(getLikesOfPostQuery, {
    variables: {
      postId
    }
  });

  const [
    likePost,
    { loading: likeLoading, error: likeError, data: likeData }
  ] = useMutation(likePostMutation, {
    variables: {
      postId
    },
    refetchQueries: [
      {
        query: getLikesOfPostQuery,
        variables: { postId }
      }
    ]
  });

  const [
    unlikePost,
    { loading: unlikeLoading, error: unlikeError, data: unlikeData }
  ] = useMutation(unlikePostMutation, {
    variables: {
      postId
    },
    refetchQueries: [
      {
        query: getLikesOfPostQuery,
        variables: { postId }
      }
    ]
  });

  let likes;
  if (likesData && likesData.getLikesOfPost) likes = likesData.getLikesOfPost;

  let isAlreadyLikedByUser = false;
  if (isAuth && likes) {
    isAlreadyLikedByUser = likes.find(
      like => like.userId.toString() === user._id
    );
  }

  const handleClick = () => {
    if (!isAuth) {
      setAlert('Login to continue', 'danger');
    } else {
      isAlreadyLikedByUser ? unlikePost() : likePost();
    }
  };

  if (loading) return <ComponentLoader />;
  if (likeError) setAlert(likeError.graphQLErrors[0].message, 'danger');
  if (unlikeError) setAlert(unlikeError.graphQLErrors[0].message, 'danger');
  if (error) console.log(error);

  return (
    <Page>
      <Post
        {...data.getPost}
        likes={likes && likes.length}
        handleClick={handleClick}
        currentUser={user}
        isAuth={isAuth}
      />
    </Page>
  );
};

const mapStateToProps = state => ({
  isAuth: state.user.isAuth,
  user: state.user.user
});

export default connect(mapStateToProps)(PostContainer);
