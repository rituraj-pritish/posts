import React, { useEffect, useState } from 'react';
import { Select, MenuItem, InputLabel, Typography } from '@material-ui/core';
import { connect } from 'react-redux';

import PostsList from '../posts/PostsList';
import TagsList from '../TagsList';
import SelectedTagsList from '../SelectedTagsList';
import { setPosts, filterPosts } from '../../actions/posts';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  '@global': {
    '.MuiMenu-list': {
      color: '#000'
    }
  },
  select: {
    margin: '0 0 20px 0'
  }
}));

const Home = ({ posts: { posts, filtered, selectedTags }, filterPosts }) => {
  const classes = useStyles();

  let [sortCategory, setSortCategory] = useState('date');

  useEffect(() => {
    if (posts.length > 0) {
      filterPosts(sortCategory, filtered.length > 0 ? filtered : posts);
    }
  }, [sortCategory]);

  const handleSelectChange = e => {
    setSortCategory(e.target.value);
  };

  return (
    <div>
      <TagsList />
      <SelectedTagsList />
      <InputLabel>Sort By</InputLabel>
      <Select
        className={classes.select}
        value={sortCategory}
        onChange={handleSelectChange}
      >
        <MenuItem value={'claps'}>Most Clapped</MenuItem>
        <MenuItem value={'date'}>Date</MenuItem>
        <MenuItem value={'views'}>Most Viewed</MenuItem>
      </Select>
      {selectedTags.length > 0 && filtered.length === 0 ? (
        <Typography>No posts with selected tags</Typography>
      ) : (
        <PostsList posts={filtered.length > 0 ? filtered : posts} />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { setPosts, filterPosts }
)(Home);
