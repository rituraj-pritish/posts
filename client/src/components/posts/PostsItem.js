import React from 'react';

import { StyledPostItem, Divider } from './PostItem.styles';
import Text from '../common/Text';
import Div from '../common/Div';
import Background from '../common/Background';
import TrendingBanner from '../trending-banner/TrendingBanner.js'

const PostsItem = ({ title, body,trending }) => {
  trending = true;
  return (
    <>
      <Divider />
      <StyledPostItem>
        <Background
          url='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKUlMVgCyQtNT9QN7QR8uieE4ZUiHc8QS33XWcT35fKQ5gz050'
          backgroundSize='cover'
          backgroundRepeat='no-repeat'
          backgroundPosition='center'
          gridRow='1/4'
        >{trending && <TrendingBanner/>}</Background>
        <Text fontSize='2.5rem' fontWeight='bold' gridColumn='2/5' gridRow='1'>
          {title}
        </Text>
        <Text gridColumn='2/5' gridRow='2'>
          {body}
        </Text>
        <Div display='flex' justifyContent='space-between' color='secondary' gridColumn='2/5' gridRow='3'>
          <Text>John Doe</Text>
          <Text>17 March, 2019</Text>
          <Text>Fashion, Travel</Text>
        </Div>
      </StyledPostItem>
      <Divider />
    </>
  );
};

export default PostsItem;
