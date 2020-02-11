import styled from 'styled-components';

import sizes from '../../../sizes'

export const StyledFooter = styled.footer`
  width: 100%;
  height: ${({ theme }) => theme.footerHeight};
  background: ${({ theme }) => theme.colors.footer};
  position: absolute;
  bottom: 0;
`;

export const MaxWidthContainer = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  padding: ${({ theme }) => theme.padding.xxl};
  height: 100%;
  width: 100%;
  margin: 0 auto;

  @media ${sizes.md1} {
    padding: 30px ${({ theme }) => theme.padding.md1};
  }

  @media ${sizes.mob} {
    padding: 30px ${({ theme }) => theme.padding.mob};
  }
`;
