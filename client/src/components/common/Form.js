import React from 'react';
import styled from 'styled-components';
import {
  space,
  typography,
  color,
  layout,
  grid,
  flexbox,
  border
} from 'styled-system';

const StyledForm = styled.form`
    ${space} ${typography} ${color} ${layout} ${grid} ${flexbox} ${border}
`;

const Form = ({ children, ...otherProps }) => {
  return <StyledForm {...otherProps}>{children}</StyledForm>;
};

export default Form;
