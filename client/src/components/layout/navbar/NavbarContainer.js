import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux'

import {signout} from '../../../redux/actions/userActions'
import Navbar from './Navbar';

const NavbarContainer = ({location,isAuth,signout}) => {
  if(location.pathname === '/signin' || location.pathname === '/signup') return null;

  return (
    <div>
      <Navbar isAuth={isAuth} signout={signout} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth
})

export default withRouter(connect(mapStateToProps,{signout})(NavbarContainer));
