import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { getPostsByUserIdQuery } from 'src/graphql/queries/postQueries';
import ComponentLoader from 'src/components/shared/ComponentLoader';
import PostsContainer from 'src/components/shared/posts-container/PostsContainer';
import Page from 'src/components/ui/Page';
import Text from 'src/components/ui/Text';

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
  if (loading) return <ComponentLoader />;

  return (
    <Page textAlign='center'>
      {posts !== undefined && posts.length === 0 ? (
        <Text mt='2rem'>No results found</Text>
      ) : (
        <Text mb='3rem' mt='2rem' fontSize='2rem'>
          Popular posts from{' '}
          <Text inline fontWeight='bold'>
            {name}
          </Text>
        </Text>
      )}
      {posts && <PostsContainer posts={posts} />}
    </Page>
  );
};

export default UserPostsContainer;
