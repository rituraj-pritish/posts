import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import ComponentLoader from 'src/components/shared/ComponentLoader';
import PostsContainer from 'src/components/shared/posts-container/PostsContainer';
import Page from 'src/components/ui/Page';
import Text from 'src/components/ui/Text';
import { getPostsByTagQuery } from 'src/graphql/queries/postQueries';

const TagPostsContainer = ({ match }) => {
  const tag = match.params.tag.toLowerCase();
  const { loading, error, data } = useQuery(getPostsByTagQuery, {
    variables: {
      tag
    }
  });

  let posts;
  if (data && data.getPostsByTag) posts = data.getPostsByTag;

  if (loading) return <ComponentLoader />;
  return (
    <Page>
      <Text>Popular posts in - {tag.toUpperCase()}</Text>
      {posts && <PostsContainer posts={posts} />}
    </Page>
  );
};

export default TagPostsContainer;
