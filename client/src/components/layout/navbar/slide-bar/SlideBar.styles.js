import styled from 'styled-components';

export const StyledSlideBar = styled.div`
  position: absolute;
  height: 100vh;
  width: 270px;
  background: #ededed;
  transition: 0.3s ease-in;
  top: 0;
  right: ${({ show }) => (show ? 0 : '-100%')};
  padding: 30px;
  padding-top: ${({ theme }) => theme.navHeight};
`;

export const StyledList = styled.ul`
  
`