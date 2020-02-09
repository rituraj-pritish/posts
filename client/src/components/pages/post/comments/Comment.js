import React from 'react';
import Moment from 'react-moment';
import Avatar from 'react-avatar';

import Div from '../../../common/Div';
import Text from '../../../common/Text';
import Background from '../../../common/Background';
import Icon from '../../../common/Icon';

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
  const name =
    firstName[0].toUpperCase() +
    firstName.slice(1) +
    ' ' +
    lastName[0].toUpperCase() +
    lastName.slice(1);

  return (
    <div key={_id}>
      <Div display='flex' p='1rem'>
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
          <Icon>
            <i className='fas fa-thumbs-up' onClick={like} />
          </Icon>
          <Icon>
            <i className='fas fa-thumbs-down' onClick={unlike} />
          </Icon>
          {isAuthor && <i className='fas fa-trash' onClick={deleteComment} />}
          {likes.length}
        </Div>
      </Div>
    </div>
  );
};

export default Comment;
