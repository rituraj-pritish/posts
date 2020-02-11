import React from 'react';

import Page from '../../../common/Page';
import Div from '../../../common/Div';
import BlogSliderContainer from '../blog-slider/BlogSliderContainer';
import Pagination from '../../../layout/pagination/Pagination';
import SidebarContainer from '../../../layout/sidebar/sidebar/SidebarContainer';
import PostsContainer from '../../../posts/PostsContainer';
import { connect } from 'react-redux';
import { StyledContainer } from './Home.styles';

const HomeContainer = ({ posts }) => {
  return (
    <Page>
      <BlogSliderContainer />
      <StyledContainer>
        <PostsContainer posts={posts} />
        <SidebarContainer />
      </StyledContainer>
      <Pagination />
    </Page>
  );
};

const mapStateToProps = state => ({
  posts: state.posts.posts
});

export default connect(mapStateToProps)(HomeContainer);
