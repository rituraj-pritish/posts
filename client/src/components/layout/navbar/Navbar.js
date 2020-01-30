import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/logo.svg';
import { StyledNavbar, Container, Logo } from './Navbar.styles';

const Navbar = ({ isAuth, signout }) => {
  return (
    <StyledNavbar>
      <Container>
        <Link to='/'>
          <Logo src={logo} />
        </Link>
        {!isAuth ? (
          <div>
            <Link to='/signup'>signup</Link>
            <Link to='/signin'>signin</Link>

          </div>
        ) : (
          <button onClick={signout}>Logout</button>
        )}
      </Container>
    </StyledNavbar>
  );
};

export default Navbar;
