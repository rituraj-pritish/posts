import styled from 'styled-components';

import sizes from 'src/sizes';

export const BackgroundContainer = styled.div`
  height: 0;
  padding-top: 55%;
  position: relative;
  overflow: hidden;
  width: 1200px;
  height: 75vh;
  max-height: 700px;
  transform: translateX(-200px);
  margin-bottom: 5rem;
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

export const StyledShareButtons = styled.div`
  button {
    border-radius: 5px !important;
    margin: 0 1rem !important;
    border: 1px solid #7d7d7d !important;
    padding: 0.5rem 2rem !important;
  }
  @media ${sizes.md1} {
    margin-bottom: 2rem;
  }

  @media ${sizes.mob} {
    display: flex;
    flex-direction: column;

    button {
      margin: 1rem 0 !important;
      width: 280px !important;
    }
  }
`;

export const StyledSocialActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
  @media ${sizes.md1} {
    flex-direction: column-reverse;
  }
`;

export const StyledLikesContainer = styled.div`
  position: relative;
  margin-left: 1rem;

  p {
    position: absolute;
    top: 26%;
    left: 39%;
    color: white;
    font-weight: bold;
    font-size: 18px;
  }
`;
