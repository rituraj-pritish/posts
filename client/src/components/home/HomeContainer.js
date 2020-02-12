import React from 'react';
import { connect } from 'react-redux';

import Page from 'src/components/ui/Page';
import Pagination from 'src/components/shared/pagination/Pagination';
import PostsContainer from 'src/components/shared/posts-container/PostsContainer';

import SidebarContainer from 'src/components/shared/sidebar/SidebarContainer';
import { StyledContainer } from './Home.styles';
import BlogSliderContainer from './blog-slider/BlogSliderContainer';

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
