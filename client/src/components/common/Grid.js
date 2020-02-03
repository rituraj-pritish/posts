import React from 'react'
import styled from 'styled-components';
import { typography, space, color, position, grid,layout, border } from 'styled-system';

const StyledGrid = styled.div`
  display: grid;
  ${typography} ${color} ${space} ${position} ${layout} ${grid} ${border}
`

const Grid = ({ children, ...otherProps }) => {
  return (
    <StyledGrid {...otherProps}>
      {children}
    </StyledGrid>
  )
}

export default Grid
