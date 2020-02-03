import React from 'react';
import styled from 'styled-components';
import {
  typography,
  space,
  color,
  position,
  grid,
  flexbox,
  layout,
  border,
  shadow
} from 'styled-system';

const StyledDiv = styled.div`
  ${typography} ${color} ${space} ${position} ${layout} ${border} ${grid} ${flexbox} ${shadow}
`;

const Div = ({ children, ...otherProps }) => {
  return <StyledDiv {...otherProps}>{children}</StyledDiv>;
};

export default Div;
