import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CircularProgress, TextField, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'

import { getCommentsOfPostQuery } from '../../graphql/queries';
import { addCommentMutation } from '../../graphql/mutations';
import Comment from './Comment';
import {setAlert} from '../../actions/alerts'

const useStyles = makeStyles(theme => ({
  commentField: {
    margin: '10px 0'
  },
}));

const CommentsList = ({ postId, userId,setAlert,auth }) => {
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

    if(!auth.isAuth) {
      setAlert('You need to sign in to comment on a post', 'error')
      return
    }

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
        color='secondary'
      />
      <Grid container justify='flex-end'>
        <Button
          variant='contained'
          color='primary'
          disabled={!comment}
          onClick={handleSubmit}
        >
          Comment
        </Button>
      </Grid>
      {data.getCommentsOfPost === [] ?
        <Typography>No comments yet...</Typography> :
        data.getCommentsOfPost.map(comment => (
        <Comment key={comment._id} postId={postId} {...comment} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps,{setAlert})(CommentsList);
