import styled from 'styled-components';

export const StyledSidebar = styled.aside`
  /* @media (max-width: 1000px) {
    display: none;
  } */
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1.5rem 0;

  svg {
    cursor: pointer;

    path {
      transition: 0.2s;
    }

    &:hover > path {
      fill: ${({theme}) => theme.colors.primary};;
    }
  }
`;

