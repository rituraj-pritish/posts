import React from 'react';
import { Grid, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    overflow: 'hidden',
    overflowWrap: 'break-word',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  link: { ...theme.link, color: theme.palette.bg },
  newpost: {
    background: theme.palette.text.primary,
    width: '100%',
  }
}));

const SidePanel = ({ auth }) => {
  const classes = useStyles();
  return (
    <Grid className={`${classes.root} side-panel`} item md={4}>
      <Container>
          <Button className={classes.newpost} variant='contained'>
            <Link className={classes.link} to='/create-post'>
              New Post
            </Link>
          </Button>
      </Container>
    </Grid>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(SidePanel);
