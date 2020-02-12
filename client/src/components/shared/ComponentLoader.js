import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

export const StyledLoaderContainer = styled.div`
  z-index: 50;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(3px);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ComponentLoader = () => {
  return (
    <StyledLoaderContainer>
      <Loader type="BallTriangle" color='#ff6d24' />
    </StyledLoaderContainer>
  );
};

export default ComponentLoader;
