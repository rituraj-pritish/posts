import styled from 'styled-components';

export const SwiperContainer = styled.div`
  position: relative;
  padding-top: 40%;
  height: 0;
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
    padding-top: 18%;
  }

  &:hover ${BannerContainer} button {
    visibility: visible;
    transform: translateY(25px);
    opacity: 1;
  }
`;
