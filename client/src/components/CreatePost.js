import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { TextField, TextareaAutosize, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/react-hooks';

import { addPostMutation } from '../graphql/mutations';
import { getPostsQuery } from '../graphql/queries';

const useStyles = makeStyles(theme => ({
  textArea: {
    backgroundColor: '#eee',
    width: '99%',
    height: '380px',
    '&:focus': {
      outlineColor: '#3f51b5'
    }
  }
}));

const CreatePost = ({ history }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const { title, content } = formData;
  const classes = useStyles();
  const [addPost, { loading, error, data }] = useMutation(addPostMutation);

  useEffect(() => {
    if (!loading && data && !error) {
      setFormData({ title: '', content: '' });
      return history.push('/dashboard');
    }
    //eslint-disable-next-line
  }, [loading, error, data]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if ((title === '', content === '')) {
      // setAlert('All fields are required', 'error');
      // return;
    }

    addPost({
      variables: { title, content },
      refetchQueries: [{ query: getPostsQuery }]
    });
  };

  return (
    <div>
      <TextField
        multiline={true}
        label='Title'
        fullWidth
        autoFocus
        required
        name='title'
        value={title}
        onChange={handleChange}
      />

      <TextareaAutosize
        className={classes.textArea}
        style={{ height: '380px', overflow: 'scroll', overflowX: 'hidden' }}
        required
        name='content'
        value={content}
        onChange={handleChange}
      />

      <Button variant='contained' color='primary' onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default withRouter(CreatePost);
