import React from 'react';
import styled from 'styled-components';
import { space } from 'styled-system';

export const StyledPage = styled.div`
  padding: 20px 50px;
  margin: 0 auto;
  margin-top: ${({ theme }) => theme.navHeight};
  padding-bottom: ${({ theme }) => parseInt(theme.footerHeight) + 20 + 'px'};
  max-width: ${({ theme }) => theme.maxWidth};

  ${space}
`;

const Page = ({ children, ...otherProps }) => {
  return <StyledPage {...otherProps}>{children}</StyledPage>;
};

export default Page;
