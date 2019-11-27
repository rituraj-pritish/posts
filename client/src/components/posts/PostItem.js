import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Icon, Badge } from '@material-ui/core';
import Moment from 'react-moment';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: '10px',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    textAlign: 'center'
  },
  link: theme.link,
  author: {
    color: theme.palette.primary.dark
  },
  details: {
    display: 'flex',
    justifyContent: 'space-around',
    color: theme.palette.primary.dark
  }
}));

const PostItem = ({
  _id,
  title,
  content,
  claps,
  date,
  user: { firstName, lastName },
  views
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div>
      <Link className={classes.link} to={`/post/${_id}`}>
        <Typography variant='h5' color='secondary'>
          <b>{title[0].toUpperCase() + title.slice(1)}</b>
        </Typography>
        <Typography className={classes.author}>
        <i>by</i>
        {' ' +
          firstName[0].toUpperCase() +
          firstName.slice(1) +
          ' ' +
          lastName[0].toUpperCase() +
          lastName.slice(1) + ' ' + '/' + ' '}
        <span>
          <Moment format='D MMM YYYY'>{date}</Moment>
        </span>
      </Typography>
      </Link>
      </div>

      <div>
      <Typography>
        {content.trim().split('').filter((word,idx) => idx < 150).join('') + '...' + 'read more'}
      </Typography>
      <Typography className={classes.details}>
        <span>{views} Views</span>
        <span>{claps.length} Claps</span>
      </Typography>
      </div>
      
    </Card>
  );
};

export default PostItem;
