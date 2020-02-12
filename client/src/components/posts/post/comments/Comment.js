import React from 'react';
import Moment from 'react-moment';
import Avatar from 'react-avatar';

import Div from 'src/components/ui/Div';
import Text from 'src/components/ui/Text';
import Background from 'src/components/ui/Background';
import Icon from 'src/components/ui/Icon';
import ThumbsDownIcon from 'src/assets/icons/ThumbsDownIcon';
import ThumbsUpIcon from 'src/assets/icons/ThumbsUpIcon';
import TrashIcon from 'src/assets/icons/TrashIcon';
import joinName from 'src/utils/joinName';

import { StyledDelete, StyledComment, Divider } from './Comment.styles';

const Comment = ({
  content,
  date,
  _id,
  user: { firstName, lastName, profileUrl },
  likes,
  like,
  unlike,
  deleteComment,
  isAuthor
}) => {
  const name = joinName(firstName, lastName);

  return (
    <>
      <StyledComment key={_id}>
        <Div display='flex' p='2rem'>
          {profileUrl ? (
            <Background
              url={profileUrl}
              borderRadius='50%'
              height='80px'
              minWidth='80px'
            />
          ) : (
            <Avatar round='50%' size='80px' name={name} />
          )}
          <Div textAlign='left' ml='2rem' display='flex' flexDirection='column'>
            <Div display='flex'>
              <Text color='#2d2d2d' fontSize='1.6rem'>
                {name}
              </Text>
              <Text color='#7d7d7d' ml='5rem' fontSize='1.4rem'>
                <Moment fromNow>{date}</Moment>
              </Text>
            </Div>
            <Text m='0.8rem 0' fontSize='1.8rem' color='#191919'>
              {content}
            </Text>

            <Div display='flex'>
              <Icon width='1.6rem' onClick={like}>
                <ThumbsUpIcon />
              </Icon>
              <Text ml='0.5rem' color='black'>
                {likes.length > 0 && likes.length}
              </Text>
              <Icon ml='2rem' width='1.6rem' onClick={unlike}>
                <ThumbsDownIcon />
              </Icon>
            </Div>

            {isAuthor && (
              <StyledDelete>
                <Icon width='1.6rem' onClick={deleteComment}>
                  <TrashIcon />
                </Icon>
              </StyledDelete>
            )}
          </Div>
        </Div>
      </StyledComment>
      <Divider />
    </>
  );
};

export default Comment;
