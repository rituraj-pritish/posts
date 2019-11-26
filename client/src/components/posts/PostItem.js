import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Icon, Badge } from '@material-ui/core';
import Moment from 'react-moment'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: '10px'
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
  claps,
  date,
  user: { firstName, lastName },
  views
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Link className={classes.link} to={`/post/${_id}`}>
        <Typography variant='h5' color='secondary'>
          {title[0].toUpperCase() + title.slice(1)}
        </Typography>
      </Link>
      <br />
      <Typography className={classes.details}>
        <span>{views} Views</span>
        <span>{claps.length} Claps</span>
        <span><Moment format='D MMM YYYY' >{date}</Moment></span>
      </Typography>
      <Typography className={classes.author}>
        {'-' +
          ' ' +
          firstName[0].toUpperCase() +
          firstName.slice(1) +
          ' ' +
          lastName[0].toUpperCase() +
          lastName.slice(1)}
      </Typography>
    </Card>
  );
};

export default PostItem;
