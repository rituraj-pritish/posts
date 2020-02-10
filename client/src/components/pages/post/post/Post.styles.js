import styled from 'styled-components';

export const BackgroundContainer = styled.div`
  height: 0;
  padding-top: 55%;
  position: relative;
  overflow: hidden;
  width: 1200px;
  height: 75vh;
  max-height: 700px;
  transform: translateX(-200px);

  @media (max-width: 1250px) {
    width: 100%;
    height: 100%;
    transform: translateX(0);
  }
`;

export const StyledBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin-bottom: 2rem;
  width: 100%;
  height: 100%;
`;
