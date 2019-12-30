import React from 'react';
import { Card, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100px',
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
  },
  link: theme.link,
  title: {
    fontWeight: 'bold',
    lineHeight: '1.2rem',
    color: theme.palette.text.primary
  },
  image: {
    width: '100px',
    objectFit: 'cover'
  },
  right: {
    width: '100%',
    padding: '5px',
    display: 'flex',
    flexDirection: 'column'
  },
  text: {
    fontSize: '0.8rem',
    color: theme.palette.primary.dark
  }
}));

const SidePanelPostItem = ({
  _id,
  title,
  content,
  imageUrl,
  claps,
  date,
  user: { firstName, lastName },
  views
}) => {
  const classes = useStyles();

  return (
    <Link className={classes.link} to={`/post/${_id}`} >
      <Card className={classes.root}>
        <img className={classes.image} src={imageUrl} alt={title} />
        <div className={classes.right}>
          <Typography className={classes.title}>{title}</Typography>
          <Typography className={classes.text}>
            <i>by</i>{' '}
            {firstName[0].toUpperCase() +
              firstName.slice(1) +
              ' ' +
              lastName[0].toUpperCase() +
              lastName.slice(1)}
          </Typography>
        </div>
      </Card>
    </Link>
  );
};

export default SidePanelPostItem;
