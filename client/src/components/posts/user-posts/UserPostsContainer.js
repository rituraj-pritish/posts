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
  console.log(posts);
  if (loading) return <ComponentLoader />;

  return (
    <Page>
      <Text>Popular posts from {name}</Text>
      {posts && <PostsContainer posts={posts} />}
    </Page>
  );
};

export default UserPostsContainer;
