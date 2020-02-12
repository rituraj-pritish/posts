import styled from 'styled-components';

export const StyledBarsContainer = styled.div`
  position: relative;
`;

export const StyledBars = styled.div`
  position: fixed;
  z-index: 20;
  width: 20px;
  height: 20px;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;

  div {
    height: 2px;
    background: ${({ theme }) => theme.colors.black};
    width: 100%;
    margin: 5px 0;
    transition: 0.3s;
  }

  div:first-child {
    position: ${({ show }) => (show ? 'absolute' : 'initial')};
    transform: ${({ show }) => (show ? 'rotateZ(45deg)' : 'rotateZ(0deg)')};
    margin: 0;
  }

  div:nth-child(2) {
    display: ${({ show }) => (show ? 'none' : 'block')};
  }

  div:last-child {
    position: ${({ show }) => (show ? 'absolute' : 'initial')};
    transform: ${({ show }) => (show ? 'rotateZ(-45deg)' : 'rotateZ(0deg)')};
    margin: 0;
  }
`;
