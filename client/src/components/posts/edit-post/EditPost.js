import React from 'react';

import Input from '../../ui/Input';
import Page from '../../ui/Page';
import Button from '../../ui/Button';
import { StyledTextArea } from './EditPost.styles';
import ImageUploader from './ImageUploader';

const EditPost = ({
  handleSubmit,
  handleChange,
  formData,
  imageUrl,
  setImageUrl,
  setImage,
  deletePost
}) => {
  const { title, content, tags } = formData;

  return (
    <Page>
      <button onClick={deletePost}>delete Post</button>
      <form onSubmit={handleSubmit}>
        <Input
          type='text'
          placeholder='Title'
          onChange={handleChange}
          value={title}
          name='title'
          id='title'
          bg='grey'
          m='0.5rem 0'
        />
        <ImageUploader
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          setImage={setImage}
        />
        <StyledTextArea
          onChange={handleChange}
          value={content}
          name='content'
          id='content'
          bg='grey'
        />
        <Input
          placeholder='comma separated tags'
          type='text'
          onChange={handleChange}
          value={tags}
          name='tags'
          id='tags'
          bg='grey'
          m='0.5rem 0'
        />
        <Button m='1rem 0'>Submit</Button>
      </form>
    </Page>
  );
};

export default EditPost;
