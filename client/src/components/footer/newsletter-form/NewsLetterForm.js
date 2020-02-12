import React from 'react';
import Button from '../../ui/Button';
import Label from '../../ui/Label';
import Input from '../../ui/Input';

import { StyledNewsLetterForm } from './NewsLetterForm.styles';

const NewsLetterForm = ({ newsLetterEmail, handleChange, handleSubmit }) => {
  return (
    <StyledNewsLetterForm onSubmit={handleSubmit}>
      <Label
        htmlFor='email-input'
        gridColumn='1/5'
        gridRow='1'
        fontSize='2.4rem'
      >
        Join our news letter
      </Label>
      <Input
        type='text'
        id='email-input'
        name='email-input'
        value={newsLetterEmail}
        onChange={handleChange}
        gridColumn='1/4'
        p='1rem'
        fontSize='1.6rem'
        borderRadius='10px 0 0 10px'
      />
      <Button height='100%' borderRadius='0 10px 10px 0'>
        Subscribe
      </Button>
    </StyledNewsLetterForm>
  );
};

export default NewsLetterForm;
