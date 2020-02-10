import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { getPostsByUserIdQuery } from '../../../graphql/queries/postQueries';
import ComponentLoader from '../../ComponentLoader';
import PostsContainer from '../../posts/PostsContainer';
import Page from '../../common/Page';
import Text from '../../common/Text';

const UserPostsContainer = ({ match }) => {
  const userId = match.params.userId;
  const name = match.params.name;
  const { loading, error, data } = useQuery(getPostsByUserIdQuery, {
    variables: {
      userId
    }
  });
  let posts;
  if (data && data.getPostsByUserId) posts = data.getPostsByUserId;
  console.log(posts);
  if (loading) return <ComponentLoader />;
  return (
    <Page>
      <Text>Popular posts from {name}</Text>
      <PostsContainer posts={posts} />
    </Page>
  );
};

export default UserPostsContainer;
