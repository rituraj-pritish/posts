import React from 'react';
import styled from 'styled-components';
import { background, grid, layout, space,border, display, position } from 'styled-system';

const StyledBackground = styled.div`
  background: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  
  ${background} ${grid} ${layout} ${space} ${border} ${display} ${position}
`;

const Background = props => {
  return <StyledBackground {...props} />;
};

export default Background;
