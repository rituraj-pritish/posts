import React from 'react';
import {Link} from 'react-router-dom'

import logo from '../../../assets/logo.svg';
import { StyledNavbar, Container, Logo } from './Navbar.styles';

const Navbar = () => {
  return (
    <StyledNavbar>
      <Container>
        <Link to='/'>
          <Logo src={logo} />
        </Link>
      </Container>
    </StyledNavbar>
  );
};

export default Navbar;
