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

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  padding: 1rem;
  font-size: 1.6rem;
  border: none;

  &:focus {
    outline: none;
  }

  &[type="file"]::-webkit-file-upload-button {
    visibility: hidden;
  }
  &[type="file"]::before {
    content: 'Select File';
    display: inline-block;
    content: 'Select File';
    display: inline-block;
    border: 1px solid grey;
    padding: 0.5rem;
    border-radius: 5px;
    cursor: pointer;
    }
  ${space} ${typography} ${color} ${layout} ${grid} ${flexbox} ${border}
`;

const Input = props => {
  return <StyledInput {...props} />;
};

export default Input;
