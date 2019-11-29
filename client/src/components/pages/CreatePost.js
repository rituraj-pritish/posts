import React, { useState, useEffect } from 'react';
import {
  TextField,
  TextareaAutosize,
  Button,
  Grid,
  Input,
  CircularProgress
} from '@material-ui/core';
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
    },
    '.left-grid': {
      maxWidth: '100%',
      flexBasis: '100%'
    }
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
  },
  imagePreview: {
    width: '100%',
    height: '400px',
    objectFit: 'cover'
  }
}));

const CreatePost = ({ history, setAlert, auth }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    imageUrl: ''
  });
  const [image, setImage] = useState(null);
  const [imgPrevUrl, setImgPrevUrl] = useState('');

  const { title, content, tags, imageUrl } = formData;
  const classes = useStyles();
  const [addPost, { loading, error, data }] = useMutation(addPostMutation);

  useEffect(() => {
    if (!loading && data.addPost && !error) {
      setFormData({ title: '', content: '', tags: '',imageUrl: '' });
      return history.push('/dashboard');
    }
    //eslint-disable-next-line
  }, [loading, error, data]);

  if(loading) return <CircularProgress/>

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === 'imageUrl') {
      const extension = e.target.value.split('.').pop();

      if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
        setAlert('Please provide URL of an image', 'error');
        setFormData({ ...formData, imageUrl: '' });
      }
      return;
    }

    if (e.target.name === 'image') {
      let reader = new FileReader();
      let file = e.target.files[0];
      
      reader.onloadend = () => {
        if (file.type !== 'image/jpeg' && file.type !== 'img/jpg') {
          setAlert('Please select a valid image', 'error');
          return;
        }

        setImage(file);
        setImgPrevUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if ((title === '', content === '')) {
      setAlert('Title and Content are required', 'error');
      return;
    }

    addPost({
      variables: { title, content, tags, image, imageUrl },
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

      <Input type='file' name='image' onChange={handleChange} />
      {(image || imageUrl) && (
        <img
          src={imageUrl ? imageUrl : imgPrevUrl}
          alt={image ? image.name : 'post-image'}
          className={classes.imagePreview}
        />
      )}

      <TextField
        label='Image Url'
        placeholder='Paste image url here'
        fullWidth
        name='imageUrl'
        value={imageUrl}
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
