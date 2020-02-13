import styled from 'styled-components';

export const StyledFooterLinks = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  margin: 2rem 0;

  ul {
    text-align: center;

    li {
      margin: 2px 0;
      transition: 0.2s;

      &:hover {
        transform: translateX(2px);
        color: #000000;
      }
    }
  }
`;
