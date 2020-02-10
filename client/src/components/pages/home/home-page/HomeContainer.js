import React from 'react';

import Page from '../../../common/Page';
import Div from '../../../common/Div';
import BlogSliderContainer from '../blog-slider/BlogSliderContainer';
import Pagination from '../../../layout/pagination/Pagination';
import SidebarContainer from '../../../layout/sidebar/sidebar/SidebarContainer';
import PostsContainer from '../../../posts/PostsContainer';
import { connect } from 'react-redux';

const HomeContainer = ({ posts }) => {
  return (
    <Page>
      <BlogSliderContainer />
      <Div
        display='grid'
        gridTemplateColumns='auto 300px'
        gridGap='2rem'
        margin='2rem 0'
      >
        <PostsContainer posts={posts} />
        <SidebarContainer />
      </Div>
      <Pagination />
    </Page>
  );
};

const mapStateToProps = state => ({
  posts: state.posts.posts,
});

export default connect(mapStateToProps)(HomeContainer);
