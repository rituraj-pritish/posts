import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { getPostQuery } from '../../../../graphql/queries/postQueries';
import Page from '../../../common/Page';
import Post from './Post';

const PostContainer = ({ match }) => {
  const postId = match.params.postId;
  const { loading, error, data } = useQuery(getPostQuery, {
    variables: {
      postId
    }
  });

  if (loading) return 'component loader';
  if (error) console.log(error);

  return (
    <Page>
      <Post {...data.getPost} />
    </Page>
  );
};

export default PostContainer;
