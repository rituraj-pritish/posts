import React from 'react';
import styled from 'styled-components';
import { typography, space, color, variant, position } from 'styled-system';
import theme from '../../theme';

const StyledButton = styled.button`
border: none;
cursor: pointer;
padding: 0.5rem 1rem;
font-size: 1.6rem;

${variant({
  variants: {
    primary: {
      color: theme.colors.white,
      bg: theme.colors.primary
    },
    secondary: {
      color: theme.colors.primary,
      bg: theme.colors.white,
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: theme.colors.primary
    }
  }
})}
${typography} ${color} ${space} ${position}
`;

const Button = ({ children, ...otherProps }) => {
  return <StyledButton {...otherProps}>{children}</StyledButton>;
};

export default Button;
