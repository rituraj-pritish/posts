import React from 'react';

import Form from '../../ui/Form';
import Input from '../../ui/Input';
import Label from '../../ui/Label';
import Button from '../../ui/Button';

const SignInForm = ({ handleChange, handleSubmit, formData }) => {
  const { email, password } = formData;
  return (
    <Form
      onSubmit={handleSubmit}
      textAlign='left'
      display='grid'
      gridGap='1rem'
      mb='2rem'
    >
      <Label htmlFor='email'>Email</Label>
      <Input
        type='text'
        onChange={handleChange}
        value={email}
        name='email'
        id='email'
        bg='grey'
      />
      <Label htmlFor='password'>Password</Label>
      <Input
        type='password'
        onChange={handleChange}
        value={password}
        name='password'
        id='password'
        bg='grey'
      />
      <Button height='38px' fontWeight='bold' mt='2rem'>
        SIGN IN
      </Button>
    </Form>
  );
};

export default SignInForm;
