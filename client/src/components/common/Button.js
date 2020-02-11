import React from 'react';
import styled from 'styled-components';
import { typography, space, color, variant, position, flexbox,layout, grid, border } from 'styled-system';
import theme from '../../theme';

const StyledButton = styled.button`
border: none;
cursor: pointer;
padding: 0.5rem 1rem;
font-size: 1.6rem;
border-radius: 5px;

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
      borderColor: theme.colors.primary,
      p: '0.4rem 1rem'
    },
    disabled: {
      background: '#a1a1a1',
      cursor: 'default',
      color: '#ffffff'
    }
  }
})}
${typography} ${color} ${space} ${position} ${layout} ${grid} ${flexbox} ${border}
`;

const Button = ({ children, ...otherProps }) => {
  return <StyledButton {...otherProps}>{children}</StyledButton>;
};

Button.defaultProps = {
  variant: 'primary'
}

export default Button;
