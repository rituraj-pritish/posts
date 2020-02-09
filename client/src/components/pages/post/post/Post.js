import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton
} from 'react-share';

import Text from '../../../common/Text';
import Background from '../../../common/Background';
import Div from '../../../common/Div';
import AuthorRow from '../author-row/AuthorRow';
import CommentsContainer from '../comments/CommentsContainer';
import { StyledBackground } from './Post.styles';

const Post = ({
  title,
  content,
  imageUrl,
  user,
  _id,
  likes = 0,
  handleClick
}) => {
  return (
    <Div m='0 auto' maxWidth='800px' textAlign='center'>
      <Text fontSize='3rem'>{title[0].toUpperCase() + title.slice(1)}</Text>
      <StyledBackground>
        <Background
          url={imageUrl}
          height='100%'
          width='100%'
          mt='2rem'
          mb='3rem'
        />
      </StyledBackground>
      <Text fontSize='2rem'>{content}</Text>
      <Div
        display='flex'
        justifyContent='space-between'
        fontSize='1.8rem'
        m='2rem 0'
      >
        <Text>
          Like post <i className='fas fa-heart' onClick={handleClick} /> likes:{' '}
          {likes}
        </Text>
        <Text>Share on: </Text>

        <FacebookShareButton url={window.location.href}>
          Facebook
        </FacebookShareButton>
        <TwitterShareButton url={window.location.href}>
          Twitter
        </TwitterShareButton>
        <RedditShareButton url={window.location.href}>Reddit</RedditShareButton>
      </Div>
      <AuthorRow {...user} />
      <CommentsContainer postId={_id} />
    </Div>
  );
};

export default Post;
