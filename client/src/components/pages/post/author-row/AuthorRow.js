import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';

import { Divider } from './AuthorRow.styles';
import Text from '../../../common/Text';
import Background from '../../../common/Background';
import Div from '../../../common/Div';

const AuthorRow = ({ firstName, lastName, id, bio, profileUrl }) => {
  const name =
    firstName[0].toUpperCase() +
    firstName.slice(1) +
    ' ' +
    lastName[0].toUpperCase() +
    lastName.slice(1);

  return (
    <Div m='2rem 0'>
      <Divider />
      <Div display='flex' p='2rem'>
        {profileUrl ? (
          <Background
            url={profileUrl}
            borderRadius='50%'
            height='150px'
            minWidth='150px'
          />
        ) : (
          <Avatar round='50%' size='150px' name={name} />
        )}
        <Div textAlign='left' ml='2rem' display='flex' flexDirection='column'>
          <Text color='primary' fontSize='2.2rem'>
            {name}
          </Text>
          <Text m='2rem 0'>{bio}</Text>
          <Text
            color='blue'
            mt='auto'
            alignSelf='flex-end'
            style={{ textDecoration: 'underline' }}
          >
            <Link>See all posts from {name}</Link>
          </Text>
        </Div>
      </Div>
      <Divider />
    </Div>
  );
};

export default AuthorRow;
