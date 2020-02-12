import styled from 'styled-components'
import sizes from 'src/sizes.js'

export const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: auto 300px;
  grid-gap: 2rem;
  margin: 5rem 0;

  @media ${sizes.l2} {
    grid-template-columns: auto;
  }
`
