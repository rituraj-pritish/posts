import React from 'react';
import Moment from 'react-moment';

import { StyledPostItem, Divider } from './PostItem.styles';
import Text from '../common/Text';
import Div from '../common/Div';
import Background from '../common/Background';
import TrendingBanner from '../trending-banner/TrendingBanner.js';

const PostsItem = ({
  title,
  content,
  trending,
  user: { firstName, lastName },
  imageUrl,
  tags,
  date
}) => {
  const name =
    firstName[0].toUpperCase() +
    firstName.slice(1) +
    ' ' +
    lastName[0].toUpperCase() +
    lastName.slice(1);

  const postTags = tags.map((tag, i) => {
    const upperCasedTag = tag[0].toUpperCase() + tag.slice(1);
    if (i === tags.length - 1) return <span key={i}>{upperCasedTag}</span>;
    return <span key={i}>{upperCasedTag + ', '}</span>;
  });

  return (
    <>
      <Divider />
      <StyledPostItem>
        <Background url={imageUrl} gridRow='1/4'>
          {trending && <TrendingBanner />}
        </Background>
        <Text fontSize='2.5rem' fontWeight='bold' gridColumn='2/5' gridRow='1'>
          {title}
        </Text>
        <Text gridColumn='2/5' gridRow='2'>
          {content
            .split('')
            .filter((c, i) => i < 200)
            .join('') + '...'}
        </Text>
        <Div
          display='flex'
          justifyContent='space-between'
          color='secondary'
          gridColumn='2/5'
          gridRow='3'
        >
          <Text>{name}</Text>
          <Text>
            <Moment format='D MMM YYYY'>{date}</Moment>
          </Text>
          <Text>{postTags}</Text>
        </Div>
      </StyledPostItem>
      <Divider />
    </>
  );
};

export default PostsItem;
