import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton
} from 'react-share';
import Moment from 'react-moment';

import Text from '../../../common/Text';
import Background from '../../../common/Background';
import Div from '../../../common/Div';
import AuthorRow from '../author-row/AuthorRow';
import CommentsContainer from '../comments/CommentsContainer';
import {
  StyledBackground,
  BackgroundContainer,
  StyledShareButtons,
  StyledSocialActions
} from './Post.styles';
import Button from '../../../common/Button';
import { Link } from 'react-router-dom';
import Icon from '../../../common/Icon';

const Post = ({
  title,
  content,
  date,
  tags,
  imageUrl,
  user,
  userId,
  isAuth,
  _id,
  likes = 0,
  currentUser,
  handleClick
}) => {
  let isAuthor = false;
  if (isAuth) isAuthor = userId.toString() === currentUser._id;

  const postTags = tags.map((tag, i) => {
    const upperCasedTag = tag[0].toUpperCase() + tag.slice(1);
    if (i === tags.length - 1) return <span key={i}>{upperCasedTag}</span>;
    return <span key={i}>{upperCasedTag + ', '}</span>;
  });
  return (
    <Div m='2rem auto' maxWidth='800px' textAlign='center'>
      {isAuthor && (
        <Div textAlign='right'>
          <Link to={`/edit-post/${_id}`}>
            <Button variant='secondary'>Edit post</Button>
          </Link>
        </Div>
      )}
      <Text fontSize={['2.5rem', '3rem', '4rem']}>
        {title[0].toUpperCase() + title.slice(1)}
      </Text>
      <Text textAlign='right' color='grey'>
        <Moment format='D MMM YYYY'>{date}</Moment>
      </Text>
      <BackgroundContainer>
        <StyledBackground>
          <Background
            url={imageUrl}
            height='100%'
            width='100%'
            mt='2rem'
            mb='3rem'
          />
        </StyledBackground>
      </BackgroundContainer>
      <Text fontSize='2rem' style={{ whiteSpace: 'pre-line' }}>
        {content}
      </Text>
      <StyledSocialActions>
        <Div>
          Like post
          <Icon>
            <i className='fas fa-heart' onClick={handleClick} />
          </Icon>
          likes: {likes}
        </Div>

        <StyledShareButtons>
          <Text mb='1rem'>Share on: </Text>
          <FacebookShareButton url={window.location.href}>
            Facebook
          </FacebookShareButton>
          <TwitterShareButton url={window.location.href}>
            Twitter
          </TwitterShareButton>
          <RedditShareButton url={window.location.href}>
            Reddit
          </RedditShareButton>
        </StyledShareButtons>
      </StyledSocialActions>

      <AuthorRow {...user} />
      <CommentsContainer postId={_id} />
    </Div>
  );
};

export default Post;
