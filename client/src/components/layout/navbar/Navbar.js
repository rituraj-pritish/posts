import React from 'react';
import { Link } from 'react-router-dom';

import {
  StyledNavbar,
  Container,
  StyledLogo,
  StyledNavRight,
  StyledBars
} from './Navbar.styles';
import Logo from '../../../assets/Logo';
import Button from '../../common/Button';
import Text from '../../common/Text';
import Div from '../../common/Div';
import SlideBar from './slide-bar/SlideBar';

const Navbar = ({ isAuth, signout, name }) => {
  return (
    <StyledNavbar>
      <Container>
        <StyledLogo>
          <Link to='/'>
            <Logo />
          </Link>
        </StyledLogo>
        <StyledNavRight>
          {!isAuth ? (
            <>
              <Link to='/signup'>
                <Button variant='secondary'>Sign Up</Button>
              </Link>
              <Link to='/signin' style={{ marginLeft: '2rem' }}>
                <Button p='1rem 3rem'>Get Started</Button>
              </Link>
            </>
          ) : (
            <>
              <Text mr='2rem'>
                Hi {'  '} {name}
              </Text>
              <Button p='0.5rem 5rem' height='36px' mr='3rem' fontWeight='bold'>
                <Link to='/create-post'>CREATE POST</Link>
              </Button>
              <Button variant='secondary' onClick={signout} height='30px'>
                Logout
              </Button>
            </>
          )}
        </StyledNavRight>
        <StyledBars>
          <SlideBar name={name} />
        </StyledBars>
      </Container>
    </StyledNavbar>
  );
};

export default Navbar;
