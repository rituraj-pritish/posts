import styled from 'styled-components';

export const StyledFooter = styled.footer`
  width: 100%;
  height: ${({ theme }) => theme.footerHeight};
  background: ${({ theme }) => theme.colors.secondary};
  position: absolute;
  bottom: 0;
`;

export const Container = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  padding: ${({ theme }) => theme.padding.xxl};
  height: 100%;
  width: 100%;
  margin: 0 auto;
`;
