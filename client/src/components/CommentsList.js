import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CircularProgress, TextField, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { getCommentsOfPostQuery } from '../graphql/queries';
import { addCommentMutation } from '../graphql/mutations';
import Comment from './Comment';

const useStyles = makeStyles(theme => ({
  commentField: {
    margin: '10px 0'
  },
  commentButton: {
    position: 'absolute',
    display: 'block',
    right: 75,
    backgroundColor: theme.palette.primary.light
  }
}));

const CommentsList = ({ postId, userId }) => {
  const classes = useStyles();
  const [comment, setComment] = useState('');
  const [addComment, addCommentRes] = useMutation(addCommentMutation);
  const { loading, error, data } = useQuery(getCommentsOfPostQuery, {
    variables: { postId }
  });

  useEffect(() => {
    if (!addCommentRes.loading && !addCommentRes.error) setComment('');
  }, [addCommentRes.loading, addCommentRes.error]);

  if (loading) return <CircularProgress />;
  if (error) return <div>ooppsss...</div>;

  const handleSubmit = e => {
    e.preventDefault();

    addComment({
      variables: { content: comment, postId },
      refetchQueries: [
        {
          query: getCommentsOfPostQuery,
          variables: { postId }
        }
      ]
    });
  };

  return (
    <div>
      <div>{data.getCommentsOfPost.length} Comments</div>
      <TextField
        className={classes.commentField}
        placeholder='Comment on post ...'
        fullWidth
        multiline
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <Grid container justify='flex-end'>
        <Button
          variant='contained'
          disabled={!comment}
          onClick={handleSubmit}
        >
          Comment
        </Button>
      </Grid>
      {data.getCommentsOfPost.map(comment => (
        <Comment key={comment._id} postId={postId} {...comment} />
      ))}
    </div>
  );
};

export default CommentsList;
