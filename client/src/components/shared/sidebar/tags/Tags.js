import React from 'react';
import { Link } from 'react-router-dom';

import Div from '../../../ui/Div';
import Text from '../../../ui/Text';
import { StyledTagItem } from './Tag.styles';

const TagItem = ({ children }) => (
  <StyledTagItem>
    <Text>
      <Link to={`/posts/${children}`}>{children}</Link>
    </Text>
  </StyledTagItem>
);

const Tags = () => {
  return (
    <Div
      width='100%'
      height='400px'
      padding='2rem'
      bg='grey'
      mb='2rem'
      color='black'
    >
      <Text textAlign='center' fontWeight='bold' fontSize='2rem'>
        Tags
      </Text>
      <Div
        display='grid'
        gridTemplateColumns='1fr 1fr'
        gridGap='85px'
        lineHeight='3rem'
      >
        <Div>
          <TagItem>Fashion</TagItem>
          <TagItem>Productivity</TagItem>
          <TagItem>Life</TagItem>
          <TagItem>Nature</TagItem>
          <TagItem>Technology</TagItem>
          <TagItem>Business</TagItem>
          <TagItem>Music</TagItem>
          <TagItem>Humour</TagItem>
          <TagItem>Travel</TagItem>
          <TagItem>Photography</TagItem>
          <TagItem>Parenting</TagItem>
        </Div>
        <Div>
          <TagItem>Health</TagItem>
          <TagItem>Education</TagItem>
          <TagItem>Food</TagItem>
          <TagItem>Movies</TagItem>
          <TagItem>Books</TagItem>
          <TagItem>Beauty</TagItem>
          <TagItem>Gaming</TagItem>
          <TagItem>Culture</TagItem>
          <TagItem>Philosophy</TagItem>
          <TagItem>Poetry</TagItem>
          <TagItem>Money</TagItem>
        </Div>
      </Div>
    </Div>
  );
};

export default Tags;
