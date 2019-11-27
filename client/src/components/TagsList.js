import React, { useState } from 'react';
import { Chip, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux'

import {addTag} from '../actions/posts'

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

const tags = [
  'tech',
  'life',
  'outdoors',
  'book',
  'book review',
  'movie',
  'movie review',
  'travel',
  'show',
  'television',
  'celebrities'
];

const TagsList = ({addTag}) => {
  const classes = useStyles();
  const [selectedTags,setSelectedTags] = useState([])

  const handleClick = (tag) => {
    
    addTag(tag)
  }

  return (
    <Container className={classes.root}>
      <Typography className={classes.text}>Filter by tags</Typography>
      {tags.map((tag,idx) => (
        <Chip
          className={classes.chip}
          label={tag}
          value={tag}
          key={idx}
          color='secondary'
          onClick={() => handleClick(tag)}
        />
      ))}
    </Container>
  );
};

export default connect(null,{addTag})(TagsList);
