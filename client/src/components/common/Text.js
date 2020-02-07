import React from 'react';
import styled from 'styled-components';
import { color, space, typography, position, grid, flexbox } from 'styled-system';

const StyledText = styled.p`
  font-size: 1.6rem;
  color: inherit;

  ${color} ${space} ${typography} ${position} ${grid} ${flexbox}
`;

const Text = ({ children, ...otherProps }) => {
  return <StyledText {...otherProps}>{children}</StyledText>;
};

export default Text;
