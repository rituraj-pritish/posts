import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { withApollo } from 'react-apollo';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link, withRouter } from 'react-router-dom';
import { Icon, Tooltip, Switch } from '@material-ui/core';

import { logout } from '../actions/auth';
import { changeTheme } from '../actions/theme';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: '#fff'
  },
  link: {
    ...theme.link,
    color: theme.palette.text.primary
  },
  switch: {
    marginRight: '30px'
  }
}));

const Navbar = ({
  auth: { loading, user, isAuth },
  isLight,
  logout,
  history,
  client,
  changeTheme
}) => {
  const classes = useStyles();

  const handleLogout = () => {
    logout();
    client.clearStore();
    history.push('/signin');
  };

  const authLinks = (
    <Fragment>
      <Button>
        <Link to='/dashboard' className={classes.link} color='inherit'>
          Dashboard
        </Link>
      </Button>
      <Tooltip title='Logout'>
        <IconButton color='inherit' onClick={handleLogout}>
          <Icon className='fa fa-sign-out-alt' />
        </IconButton>
      </Tooltip>
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
      <AppBar position='fixed' >
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <Link className={classes.link} to='/'>
              Posts
            </Link>
          </Typography>
          <Icon className='fas fa-adjust' />
          <Switch className={classes.switch} checked={!isLight} onChange={() => changeTheme(isLight)} />
          {isAuth ? authLinks : noAuthLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  isLight: state.theme.isLight
});

const component = connect(
  mapStateToProps,
  { logout,changeTheme }
)(Navbar);

export default withApollo(withRouter(component));
