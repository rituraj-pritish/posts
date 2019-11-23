import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, withRouter } from 'react-router-dom';
import { Icon } from '@material-ui/core';

import { logout } from '../actions/auth';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  link: {
    color: '#fff',
    textDecoration: 'none'
  }
}));

const Navbar = ({ auth: { loading, user, isAuth }, logout, history }) => {
  const classes = useStyles();

  const handleLogout = () => {
    logout();
    history.push('/signin');
  };
  console.log(history);

  const authLinks = (
    <Fragment>
      <Button>
        <Link to='/dashboard' className={classes.link} color='inherit'>
          Dashboard
        </Link>
      </Button>
      <IconButton color='inherit' onClick={handleLogout}>
        <Icon className='fa fa-sign-out-alt' />
      </IconButton>
    </Fragment>
  );

  const noAuthLinks = (
    <Fragment>
      <Button>
        <Link to='/signin' className={classes.link} color='inherit'>
          Sign In
        </Link>
      </Button>
      <Button>
        <Link to='/signup' className={classes.link} color='inherit'>
          Sign Up
        </Link>
      </Button>
    </Fragment>
  );

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Posts
          </Typography>
          {isAuth ? authLinks : noAuthLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const component = connect(
  mapStateToProps,
  { logout }
)(Navbar);

export default withRouter(component);
