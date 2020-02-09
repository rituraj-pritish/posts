import styled from 'styled-components';

export const StyledSocilaAuth = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;
