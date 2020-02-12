import styled from 'styled-components';
import sizes from 'src/sizes.js';

export const StyledSidebar = styled.aside`
  @media ${sizes.l2} {
    display: none;
  }
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
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`;
