import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';

import trendingPosts from 'src/data/trendingPosts';
import {
  getPostQuery,
  getLikesOfPostQuery
} from 'src/graphql/queries/postQueries';
import {
  likePostMutation,
  unlikePostMutation
} from 'src/graphql/mutations/postMutations';
import Page from 'src/components/ui/Page';
import Div from 'src/components/ui/Div';
import Text from 'src/components/ui/Text';
import setAlert from 'src/utils/setAlert';
import ComponentLoader from 'src/components/shared/ComponentLoader';
import PostsContainer from 'src/components/shared/posts-container/PostsContainer';

import Post from './Post';

const PostContainer = ({ match, isAuth, user, posts }) => {
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
      <Div maxWidth='800px' m='0 auto'>
        <Post
          {...data.getPost}
          likes={likes && likes.length}
          handleClick={handleClick}
          currentUser={user}
          isAuth={isAuth}
        />
        <Text fontSize='2rem' mt='5rem' mb='2rem' textAlign='center'>
          Trending Posts
        </Text>
        <PostsContainer posts={trendingPosts} />
      </Div>
    </Page>
  );
};

const mapStateToProps = state => ({
  isAuth: state.user.isAuth,
  user: state.user.user,
  posts: state.posts.posts
});

export default connect(mapStateToProps)(PostContainer);
