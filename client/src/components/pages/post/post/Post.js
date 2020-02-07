import React from 'react';

import Text from '../../../common/Text';
import Background from '../../../common/Background';
import Div from '../../../common/Div';
import AuthorRow from '../author-row/AuthorRow';
import CommentsContainer from '../comments/CommentsContainer';

const Post = ({ title, content, imageUrl, user, _id }) => {
  return (
    <Div m='0 auto' maxWidth='1000px' textAlign='center'>
      <Text fontSize='3rem'>{title[0].toUpperCase() + title.slice(1)}</Text>
      <Background url={imageUrl} height='400px' mt='2rem' mb='3rem' />
      <Text fontSize='2rem'>{content}</Text>
      <Div
        display='flex'
        justifyContent='space-between'
        fontSize='1.8rem'
        m='2rem 0'
      >
        <Text>Like post</Text>
        <Text>Share post</Text>
      </Div>
      <AuthorRow {...user} />
      <CommentsContainer postId={_id} />
    </Div>
  );
};

export default Post;
