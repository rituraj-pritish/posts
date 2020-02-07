import React from 'react';
import { Link } from 'react-router-dom';

import { StyledNavbar, Container, StyledLogo } from './Navbar.styles';
import Logo from '../../../assets/Logo';
import Button from '../../common/Button';
import Div from '../../common/Div';

const Navbar = ({ isAuth, signout }) => {
  return (
    <StyledNavbar>
      <Container>
        <StyledLogo>
          <Link to='/'>
            <Logo />
          </Link>
        </StyledLogo>
          <Div gridColumn='3' textAlign='right'>
        {!isAuth ? (
            <>
            <Link to='/signup'>
              <Button variant='secondary' >Sign Up</Button>
            </Link>
            <Link to='/signin' style={{marginLeft: '2rem'}}>
              <Button p='1rem 3rem'>Sign In</Button>
            </Link>
            </>
        ) : (
          <Button onClick={signout} gridColumn='3' width='50%'>Logout</Button>
        )}
          </Div>
      </Container>  
    </StyledNavbar>
  );
};

export default Navbar;
