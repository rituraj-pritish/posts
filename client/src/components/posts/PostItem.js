import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Grid } from '@material-ui/core';
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
  title: {
    lineHeight: '1.6rem',
    marginTop: '10px'
  },
  link: theme.link,
  text: {
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
  imageUrl,
  claps,
  date,
  user: { firstName, lastName },
  views
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Link className={classes.link} to={`/post/${_id}`}>
        <Grid container justify='center'>
          <div
            style={{
              background: `url(${imageUrl})`,
              backgroundSize: 'cover',
              width: '100%',
              height: '150px'
            }}
          />

          <div>
            <Typography
              className={classes.title}
              variant='h6'
              color='secondary'
            >
              <b>{title[0].toUpperCase() + title.slice(1)}</b>
            </Typography>
            <Typography className={classes.text}>
              <i>by</i>
              {' ' +
                firstName[0].toUpperCase() +
                firstName.slice(1) +
                ' ' +
                lastName[0].toUpperCase() +
                lastName.slice(1) +
                ' ' +
                '/' +
                ' '}
              <span>
                <Moment format='D MMM YYYY'>{date}</Moment>
              </span>
            </Typography>

            <Grid className={classes.text} container justify='space-around'>
              <span>Views: {views}</span>
              <span>Claps: {claps.length}</span>
            </Grid>
          </div>
        </Grid>
      </Link>
    </Card>
  );
};

export default PostItem;
