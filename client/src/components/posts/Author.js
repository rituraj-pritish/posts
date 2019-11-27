import React from 'react';
import { Container, Avatar, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  avatar: {
    marginRight: '30px',
    height: '100px',
    width: '100px',
    fontSize: '50px'
  }
}));

const Author = ({ firstName, lastName }) => {
  const classes = useStyles();

  return (
    <Container>
      <Grid container>
        <Grid item>
          <Avatar className={classes.avatar}>
            {firstName[0].toUpperCase() + lastName[0].toUpperCase()}
          </Avatar>
        </Grid>
        <Grid item>
          <Typography>
            {firstName[0].toUpperCase() +
              firstName.slice(1) +
              ' ' +
              lastName[0].toUpperCase() +
              lastName.slice(1)}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Author;
