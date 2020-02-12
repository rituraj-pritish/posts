import styled from 'styled-components';

import sizes from 'src/sizes';

export const SwiperContainer = styled.div`
  position: relative;
  padding-top: 40%;
  height: 0;

  @media ${sizes.l2} {
    padding-top: 50%;
  }

  @media ${sizes.md2} {
    padding-top: 60%;
  }

  @media ${sizes.mob} {
    padding-top: 100%;
  }
`;

export const Background = styled.div`
  background: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
`;

export const BannerContainer = styled.div`
  padding-top: 14%;
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 0;
  transition: 0.3s ease-in-out;

  @media ${sizes.l1} {
    padding-top: 16%;
  }

  @media ${sizes.l2} {
    padding-top: 18%;
  }

  @media ${sizes.md1} {
    padding-top: 25%;
  }

  @media ${sizes.md1} {
    padding-top: 40%;
  }
`;

export const Banner = styled.div`
  background: #000000a1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 25px;
  color: ${({ theme }) => theme.colors.white};
  display: grid;
  grid-template-columns: auto 100px;

  button {
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s ease-in-out;
    transform: translateY(30px);
  }
`;

export const Slide = styled.div`
  position: relative;
  cursor: pointer;
  width: 80%;

  &:hover ${BannerContainer} {
    padding-top: 21%;

    @media ${sizes.l1} {
      padding-top: 22%;
    }

    @media ${sizes.l2} {
      padding-top: 27%;
    }

    @media ${sizes.md1} {
      padding-top: 25%;
    }

    @media ${sizes.md1} {
      padding-top: 40%;
    }
  }

  &:hover ${BannerContainer} button {
    visibility: visible;
    transform: translateY(25px);
    opacity: 1;

    @media ${sizes.md1} {
      visibility: hidden;
    }
  }

  @media ${sizes.md2} {
    width: 100%;
  }
`;
