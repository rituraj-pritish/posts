import React from 'react'
import { StyledFooter, Container } from './Footer.styles'
import { withRouter } from 'react-router-dom';

const Footer = ({location}) => {
  if(location.pathname === '/signin' || location.pathname === '/signup') return null;
  return (
    <StyledFooter>
      <Container>
        
      </Container>
    </StyledFooter>
  )
}

export default withRouter(Footer)
