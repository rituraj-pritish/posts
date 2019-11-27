import React, { useState, useEffect } from 'react';
import {
  TextField,
  TextareaAutosize,
  Button,
  Grid,
  CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { updatePostMutation } from '../../graphql/mutations';
import {
  getPostsQuery,
  getUserQuery,
  getPostQuery
} from '../../graphql/queries';
import { setAlert } from '../../actions/alerts';

const useStyles = makeStyles(theme => ({
  '@global': {
    '.side-panel': {
      display: 'none'
    },
    '.left-grid' : {
      maxWidth: '100%',
      flexBasis: '100%'
    },
  },
  textArea: {
    backgroundColor: theme.palette.bg,
    width: '98%',
    height: '380px',
    margin: '20px 0',
    padding: '10px',
    color: theme.palette.text.primary,
    '&:focus': {
      outlineColor: theme.palette.text.primary
    }
  }
}));

const EditPost = ({ history, setAlert, auth, match }) => {
  const postId = match.params.postId;
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const { title, content, tags } = formData;
  const classes = useStyles();
  const { loading, error, data } = useQuery(getPostQuery, {
    variables: { postId }
  });
  const [updatePost, updatePostRes] = useMutation(updatePostMutation);

  useEffect(() => {
    if (!loading && data && !error) {
      setFormData({
        title: data.getPost.title,
        content: data.getPost.content,
        tags: data.getPost.tags.join(', ')
      });
    }

    if (
      !updatePostRes.loading &&
      !updatePostRes.error &&
      updatePostRes.data &&
      updatePostRes.data.updatePost
    ) {
      history.push(`/post/${postId}`);
    }
    //eslint-disable-next-line
  }, [loading, error, data, updatePostRes.loading, updatePostRes.error]);

  if (error) return <div>oopps</div>;
  if (loading) return <CircularProgress />;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if ((title === '', content === '')) {
      setAlert('Title and Content are required', 'error');
      return;
    }

    updatePost({
      variables: { title, content, postId, tags },
      refetchQueries: [
        { query: getPostQuery, variables: { postId } },
        { query: getPostsQuery },
        { query: getUserQuery, variables: { userId: auth.user._id } }
      ]
    });
  };

  return (
    <div className={classes.root}>
      <TextField
        multiline={true}
        label='Title'
        fullWidth
        autoFocus
        required
        name='title'
        value={title}
        onChange={handleChange}
        color='secondary'
      />

      <TextField
        multiline={true}
        label='Tags'
        placeholder='comma separated tags'
        fullWidth
        name='tags'
        value={tags}
        onChange={handleChange}
        color='secondary'
      />

      <TextareaAutosize
        className={classes.textArea}
        style={{ height: '380px', overflow: 'scroll', overflowX: 'hidden' }}
        placeholder='Write content here'
        name='content'
        value={content}
        onChange={handleChange}
      />

      <Grid container justify='flex-end'>
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setAlert }
)(EditPost);
