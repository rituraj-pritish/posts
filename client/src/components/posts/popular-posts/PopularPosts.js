import React from 'react';

import Page from 'src/components/ui/Page';
import Text from 'src/components/ui/Text';
import trendingPosts from 'src/data/trendingPosts';

import PostsContainer from 'src/components/shared/posts-container/PostsContainer';

const PopularPosts = () => {
  return (
    <Page>
      <Text textAlign='center' fontSize='2rem' mt='2rem' mb='3rem'>
        Popular Posts
      </Text>
      <PostsContainer posts={trendingPosts} />
    </Page>
  );
};

export default PopularPosts;
