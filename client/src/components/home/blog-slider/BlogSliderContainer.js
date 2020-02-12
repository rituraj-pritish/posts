import React from 'react';

import BlogSlider from './BlogSlider';
import trendingPosts from 'src/data/trendingPosts';

const BlogSliderContainer = () => {
  return <BlogSlider posts={trendingPosts} />;
};

export default BlogSliderContainer;
