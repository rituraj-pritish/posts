import React from 'react';
import styled from 'styled-components';

const StyledBanner = styled.div`
  background: #ff6d24c2;
  padding: 1rem;
  color: #fff;
  width: fit-content;
`;

const TrendingBanner = () => {
  return <StyledBanner>Trending</StyledBanner>;
};

export default TrendingBanner;
