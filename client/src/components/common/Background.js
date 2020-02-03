import React from 'react';
import styled from 'styled-components';
import { background, grid } from 'styled-system';

const StyledBackground = styled.div`
  background: ${({url}) => `url(${url})` };
  ${background} ${grid}
`;

const Background = (props) => {
  return <StyledBackground {...props} />;
};

export default Background;
