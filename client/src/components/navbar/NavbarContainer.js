import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { signout } from '../../redux/actions/userActions';
import Navbar from './Navbar';

const NavbarContainer = ({ location, isAuth, signout, user }) => {
  if (location.pathname === '/signin' || location.pathname === '/signup')
    return null;

  let name;
  if (isAuth) {
    const { firstName } = user;
    name = firstName[0].toUpperCase() + firstName.slice(1);
  }

  return (
    <div>
      <Navbar isAuth={isAuth} signout={signout} name={name} />
    </div>
  );
};

const mapStateToProps = state => ({
  isAuth: state.user.isAuth,
  user: state.user.user
});

export default withRouter(
  connect(mapStateToProps, { signout })(NavbarContainer)
);
