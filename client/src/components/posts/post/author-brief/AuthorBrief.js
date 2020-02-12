import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';

import Text from 'src/components/ui/Text';
import Background from 'src/components/ui/Background';
import Div from 'src/components/ui/Div';
import joinName from 'src/utils/joinName';

import { Divider } from './AuthorBrief.styles';

const AuthorBrief = ({ firstName, lastName, _id, bio, profileUrl }) => {
  const name = joinName(firstName, lastName);

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
            <Link to={`/posts/${name}/${_id}`}>See all posts from {name}</Link>
          </Text>
        </Div>
      </Div>
      <Divider />
    </Div>
  );
};

export default AuthorBrief;
