import styled from 'styled-components';

export const StyledSlideBar = styled.div`
  position: absolute;
  height: 100vh;
  width: 250px;
  background: #ededed;
  transition: 0.3s ease-in;
  top: 0;
  right: ${({ show }) => (show ? 0 : '-100%')};
  padding: 40px;
`;

export const StyledList = styled.ul`
  text-align: right;

  li {
    margin: 0.7rem 0;
  }
`