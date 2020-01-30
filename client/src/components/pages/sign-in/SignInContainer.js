import React, { useState, useEffect, useRef } from 'react';

import formValidator from '../../../utils/formValidator';
import { setAlert } from '../../../redux/actions/userActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Page from '../../common/Page';
import SignInForm from './SignInForm';
import SignInQuery from './SignInQuery';
import AuthButtonContainer from '../../auth-button/AuthButtonContainer';

const SignInContainer = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const signInRef = useRef();

  const resetForm = () => {
    setFormData({
      email: '',
      password: ''
    });
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { isEmpty } = formValidator;
  const handleSubmit = e => {
    e.preventDefault();

    if (isEmpty(email, password)) {
      setAlert('All fields are required', 'danger');
      return;
    } else {
      signInRef.current.callLoginQuery(formData);
    }
  };

  return (
    <Page>
      <SignInForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
      />
      <AuthButtonContainer provider='google' buttonText='Sign In with Google' />
      <AuthButtonContainer
        provider='facebook'
        buttonText='Sign In with Facebook'
      />
      New here ? <Link to='/signup'>Sign Up</Link>
      <SignInQuery ref={signInRef} resetForm={resetForm} />
    </Page>
  );
};

export default connect(null, { setAlert })(SignInContainer);
