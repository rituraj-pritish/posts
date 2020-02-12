import React from 'react'
import styled from 'styled-components'
import {space, typography, color, layout,grid,flexbox} from 'styled-system'

const StyledLabel = styled.label`
  ${space} ${typography} ${color} ${layout} ${grid} ${flexbox}
`

const Label = ({children, ...otherProps}) => {
  return (
    <StyledLabel {...otherProps} >
      {children}
    </StyledLabel>
  )
}

export default Label
