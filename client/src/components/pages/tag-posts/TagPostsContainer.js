import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { getPostsByTagQuery } from '../../../graphql/queries/postQueries';
import ComponentLoader from '../../ComponentLoader';
import PostsContainer from '../../posts/PostsContainer';
import Page from '../../common/Page';
import Text from '../../common/Text';

const TagPostsContainer = ({ match }) => {
  const tag = match.params.tag.toLowerCase();
  const { loading, error, data } = useQuery(getPostsByTagQuery, {
    variables: {
      tag
    }
  });

  useEffect(() => {}, [tag, data]);

  let posts;
  if (data && data.getPostsByTag) posts = data.getPostsByTag;
  console.log(posts);
  console.log(error);
  if (loading) return <ComponentLoader />;
  return (
    <Page>
      <Text>Popular posts in - {tag.toUpperCase()}</Text>
      <PostsContainer posts={posts} />
    </Page>
  );
};

export default TagPostsContainer;
