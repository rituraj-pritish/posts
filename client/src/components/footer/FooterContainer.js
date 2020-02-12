import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { StyledFooter, MaxWidthContainer } from './Footer.styles';

import NewsLetterForm from './newsletter-form/NewsLetterForm';

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
      </MaxWidthContainer>
    </StyledFooter>
  );
};

export default withRouter(FooterContainer);
