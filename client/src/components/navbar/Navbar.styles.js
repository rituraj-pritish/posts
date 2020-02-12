import styled from 'styled-components';
import sizes from 'src/sizes';

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
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${sizes.md1} {
    padding: 0 ${({ theme }) => theme.padding.md1};
  }

  @media ${sizes.mob} {
    padding: 0 ${({ theme }) => theme.padding.mob};
  }
`;

export const StyledLogo = styled.div`
  width: fit-content;
`;

export const StyledNavRight = styled.div`
  display: flex;
  align-items: center;

  @media ${sizes.md2} {
    display: none;
  }
`;

export const StyledBars = styled.div`
  display: none;
  @media ${sizes.md2} {
    display: block;
  }
`;
