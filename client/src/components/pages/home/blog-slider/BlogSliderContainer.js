import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';

import { setTrendingPosts } from '../../../../redux/actions/postsActions';
import { getTrendingPostsQuery } from '../../../../graphql/queries/postQueries';
import BlogSlider from './BlogSlider';
import ComponentLoader from '../../../ComponentLoader';

const BlogSliderContainer = ({ trendingPosts, setTrendingPosts }) => {
  const [getTrendingPosts, { loading, error, data }] = useLazyQuery(
    getTrendingPostsQuery
  );
  useEffect(() => {
    if (trendingPosts.length === 0) getTrendingPosts();
  }, []);
  if (data && data.getTrendingPosts) setTrendingPosts(data.getTrendingPosts);

  if (loading) return <ComponentLoader />;
  return <BlogSlider posts={trendingPosts} />;
};

const mapStateToProps = state => ({
  trendingPosts: state.posts.trending
});

export default connect(mapStateToProps, { setTrendingPosts })(
  BlogSliderContainer
);
