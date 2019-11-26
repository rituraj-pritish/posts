import React, { useState, useEffect } from 'react';
import { TextField, TextareaAutosize, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';

import { addPostMutation } from '../../graphql/mutations';
import { getPostsQuery, getUserQuery } from '../../graphql/queries';
import { setAlert } from '../../actions/alerts';

const useStyles = makeStyles(theme => ({
  '@global': {
    '.side-panel': {
      display: 'none'
    }
  },
  root: {
    maxWidth: '88vw',
    width: '86vw'
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

const CreatePost = ({ history, setAlert, auth }) => {
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
      setAlert('All fields are required', 'error');
      return;
    }

    addPost({
      variables: { title, content },
      refetchQueries: [
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
)(CreatePost);
