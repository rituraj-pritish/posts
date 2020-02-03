import React from 'react';

import Page from '../../../common/Page';
import Grid from '../../../common/Grid';
import BlogSliderContainer from '../blog-slider/BlogSliderContainer';
import Pagination from '../../../layout/pagination/Pagination';
import SidebarContainer from '../../../layout/sidebar/sidebar/SidebarContainer';
import PostsContainer from '../../../posts/PostsContainer';

const HomeContainer = () => {
  return (
    <Page>
      <BlogSliderContainer />
      <Grid gridTemplateColumns='auto 300px' gridGap='2rem' margin='2rem 0'>
        <PostsContainer/>
        <SidebarContainer />
      </Grid>
      <Pagination />
    </Page>
  );
};

export default HomeContainer;
