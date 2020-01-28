import styled from 'styled-components';

export const StyledNavbar = styled.nav`
  z-index: 50;
  height: ${({ theme }) => theme.navHeight};
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #fafafa;
  box-shadow: 0 8px 10px #00000030;
`;

export const Container = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.padding.xxl};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
`;

export const Logo = styled.img`
  width: auto;
`     
