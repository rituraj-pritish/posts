import React from 'react';

const SignInForm = ({ handleChange, handleSubmit, formData }) => {
  const { email, password } = formData;
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          value={password}
          name='password'
          id='password'
        />
        <input type="submit"/>
      </form>
    </div>
  );
};

export default SignInForm;
