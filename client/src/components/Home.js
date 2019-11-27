import React,{useRef,useEffect,useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress, Select, MenuItem, InputLabel } from '@material-ui/core';
import { connect } from 'react-redux';

import { getPostsQuery } from '../graphql/queries';
import PostsList from './posts/PostsList';
import TagsList from './TagsList';
import SelectedTagsList from './SelectedTagsList';
import {setPosts, filterPosts} from '../actions/posts'

const Home = ({ auth,setPosts, posts:{posts,filtered},filterPosts }) => {
  let [sortCategory, setSortCategory] = useState('date')

  useEffect(() => {
    if(posts.length > 0 ) {
    filterPosts(sortCategory, filtered.length > 0 ? filtered : posts) 
    }

  },[sortCategory])

  const handleSelectChange = e => {

    setSortCategory(e.target.value)

  }

  return (
    <div>
      <TagsList/>
      <SelectedTagsList/>
      filter by drop down
      <InputLabel>Sort By</InputLabel>
      <Select value={sortCategory} onChange={handleSelectChange} >
        <MenuItem value={'claps'}>Most Clapped</MenuItem>
        <MenuItem value={'date'}>Date</MenuItem>
        <MenuItem value={'views'}>Most Viewed</MenuItem>
      </Select>
      <PostsList posts={filtered.length > 0 ? filtered :posts} />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts
});

export default connect(mapStateToProps,{setPosts, filterPosts})(Home);
