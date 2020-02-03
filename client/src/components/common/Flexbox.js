import React from 'react';
import styled from 'styled-components';
import {
  typography,
  space,
  color,
  position,
  flexbox,
  layout,
  border
} from 'styled-system';

const StyledFlexbox = styled.div`
  display: flex;
  ${typography} ${color} ${space} ${position} ${layout} ${flexbox} ${border}
`;

const Flexbox = ({ children, ...otherProps }) => {
  return <StyledFlexbox {...otherProps}>{children}</StyledFlexbox>;
};

export default Flexbox;
