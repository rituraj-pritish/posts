import React from 'react';

import Input from '../../common/Input';
import Page from '../../common/Page';
import Button from '../../common/Button';
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
          onChange={handleChange}
          value={title}
          name='title'
          id='title'
          bg='grey'
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
        />
        <Button>Submit</Button>
      </form>
    </Page>
  );
};

export default EditPost;
