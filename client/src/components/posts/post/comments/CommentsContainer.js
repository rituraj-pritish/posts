import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { getCommentsOfPostQuery } from 'src/graphql/queries/postQueries';
import { addCommentMutation } from 'src/graphql/mutations/postMutations';
import setAlert from 'src/utils/setAlert';
import Input from 'src/components/ui/Input';
import Button from 'src/components/ui/Button';
import Div from 'src/components/ui/Div';

import CommentContainer from './CommentContainer';

const CommentsContainer = ({ postId, isAuth }) => {
  const [text, setText] = useState('');
  const { loading, error, data } = useQuery(getCommentsOfPostQuery, {
    variables: {
      postId
    }
  });

  const [addComment, { addLoading, addError, addData }] = useMutation(
    addCommentMutation,
    {
      variables: {
        content: text,
        postId
      },
      refetchQueries: [
        {
          query: getCommentsOfPostQuery,
          variables: { postId }
        }
      ]
    }
  );

  if (loading) return 'loading';
  if (error) console.log(error);

  const handleComment = e => {
    e.preventDefault();
    if(!text) return;
    if (!isAuth) {
      setAlert('Login to continue', 'danger');
    } else {
      addComment();
      setText('');
    }
  };
  if (addError) console.log(addError);
  let comments;
  if (data) comments = data.getCommentsOfPost;

  return (
    <div style={{ textAlign: 'left' }}>
      {comments.length} Comments
      <form onSubmit={handleComment}>
        <Input
          placeholder='Comment on post'
          borderBottom='2px solid grey'
          borderRadius='0'
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <Div textAlign='right' m='2rem 0'>
          <Button variant={text ? 'primary' : 'disabled'}>Comment</Button>
        </Div>
      </form>
      {comments.map(comment => (
        <CommentContainer comment={comment} postId={postId} />
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  isAuth: state.user.isAuth
});

export default connect(mapStateToProps)(CommentsContainer);
