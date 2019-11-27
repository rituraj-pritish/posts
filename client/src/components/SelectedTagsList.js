import React from 'react';
import { Chip, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';

import { removeTags } from '../actions/posts';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '30px'
  },
  text: {
    color: theme.palette.primary.dark
  },
  chip: {
    margin: '8px 10px'
  }
}));

const SelectedTagsList = ({ removeTags, posts }) => {
  const classes = useStyles();

  const handleClick = tag => {};

  if (posts.selectedTags.length === 0) {
    return null;
  }
  return (
    <Container className={classes.root}>
      <Chip
        className={classes.deleteAll}
        label='remove all'
        onDelete={removeTags}
        size='small'
      />
      {posts.selectedTags.map((tag, idx) => (
        <Chip
          size='small'
          className={classes.chip}
          label={tag}
          value={tag}
          key={idx}
          onClick={() => handleClick(tag)}
        />
      ))}
    </Container>
  );
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { removeTags }
)(SelectedTagsList);
