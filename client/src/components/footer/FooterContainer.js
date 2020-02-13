import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import Text from 'src/components/ui/Text';

import NewsLetterForm from './newsletter-form/NewsLetterForm';
import FooterLinks from './footer-links/FooterLinks';
import { StyledFooter, MaxWidthContainer } from './Footer.styles';

const FooterContainer = ({ location }) => {
  const [newsLetterEmail, setNewsLetterEmail] = useState('');
  if (location.pathname === '/signin' || location.pathname === '/signup')
    return null;

  const handleChange = e => {
    setNewsLetterEmail(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <StyledFooter>
      <MaxWidthContainer>
        <NewsLetterForm
          newsLetterEmail={newsLetterEmail}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <FooterLinks />
        <Text textAlign='center' fontSize='1.3rem'>
          &copy; Blogg
        </Text>
      </MaxWidthContainer>
    </StyledFooter>
  );
};

export default withRouter(FooterContainer);
