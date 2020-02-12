import React from 'react';

import Form from '../../ui/Form';
import Input from '../../ui/Input';
import Label from '../../ui/Label';
import Button from '../../ui/Button';

const SignUpForm = ({ formData, handleChange, handleSubmit }) => {
  const { firstName, lastName, email, password1, password2 } = formData;

  return (
    <Form
      onSubmit={handleSubmit}
      display='grid'
      gridGap='1rem'
      textAlign='left'
      mb='2rem'
    >
      <Label htmlFor='firstName'>First Name</Label>
      <Input
        typ='text'
        onChange={handleChange}
        value={firstName}
        name='firstName'
        id='firstName'
        bg='grey'
      />
      <Label htmlFor='firstName'>Last Name</Label>
      <Input
        type='text'
        onChange={handleChange}
        value={lastName}
        name='lastName'
        id='lastName'
        bg='grey'
      />
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
        value={password1}
        name='password1'
        id='password'
        bg='grey'
      />
      <Label htmlFor='confirm-password'>Confirm Password</Label>
      <Input
        type='password'
        onChange={handleChange}
        value={password2}
        name='password2'
        id='confirm-password'
        bg='grey'
      />
      <Button height='38px' fontWeight='bold' mt='2rem'>
        SIGN UP
      </Button>
    </Form>
  );
};

export default SignUpForm;
