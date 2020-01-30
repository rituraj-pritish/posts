import React from 'react';

const SignUp = ({ formData, handleChange, handleSubmit }) => {
  const { firstName, lastName, email, password1, password2 } = formData;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='firstName'>First Name</label>
        <input
          typ='text'
          onChange={handleChange}
          value={firstName}
          name='firstName'
          id='firstName'
        />
        <label htmlFor='firstName'>Last Name</label>
        <input
          type='text'
          onChange={handleChange}
          value={lastName}
          name='lastName'
          id='lastName'
        />
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          onChange={handleChange}
          value={email}
          name='email'
          id='email'
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          onChange={handleChange}
          value={password1}
          name='password1'
          id='password'
        />
        <label htmlFor='confirm-password'>Confirm Password</label>
        <input
          type='password'
          onChange={handleChange}
          value={password2}
          name='password2'
          id='confirm-password'
        />
        <input type='submit' />
      </form>
    </div>
  );
};

export default SignUp;
