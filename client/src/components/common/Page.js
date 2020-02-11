import React from 'react';
import styled from 'styled-components';
import { space } from 'styled-system';

import sizes from '../../sizes';

export const StyledPage = styled.div`
  padding: 20px 50px;
  margin: 0 auto;
  margin-top: ${({ theme }) => theme.navHeight};
  padding-bottom: ${({ theme }) => parseInt(theme.footerHeight) + 20 + 'px'};
  max-width: ${({ theme }) => theme.maxWidth};
  color: ${({ theme }) => theme.colors.black};

  @media ${sizes.md1} {
    padding: 20px ${({theme}) => theme.padding.md1};;
    padding-bottom: ${({ theme }) => parseInt(theme.footerHeight) + 20 + 'px'};
  }

  @media ${sizes.mob} {
    padding: 20px ${({theme}) => theme.padding.mob};;
    padding-bottom: ${({ theme }) => parseInt(theme.footerHeight) + 20 + 'px'};
  }

  ${space}
`;

const Page = ({ children, ...otherProps }) => {
  return <StyledPage {...otherProps}>{children}</StyledPage>;
};

export default Page;