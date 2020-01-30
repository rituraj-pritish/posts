import React, { useState, useEffect, useRef } from 'react';
import formValidator from '../../../utils/formValidator';
import { setAlert } from '../../../redux/actions/userActions';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

import Page from '../../common/Page';
import SignUp from './SignUp';
import AuthButtonContainer from '../../auth-button/AuthButtonContainer';
import SignUpMutation from './SignUpMutation';

const SignUpContainer = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password1: '',
    password2: ''
  });
  const { firstName, lastName, email, password1, password2 } = formData;

  const signUpRef = useRef();
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password1: '',
      password2: ''
    });
  };

  const { isEmpty, matchPassword, isValidPassword } = formValidator;
  const handleSubmit = e => {
    e.preventDefault();

    if (isEmpty(firstName, lastName, email, password1, password2)) {
      setAlert('All fields are required', 'danger');
      return;
    } else if (!matchPassword(password1, password2)) {
      setAlert('Passwords do not match', 'danger');
      return;
    } else if (isValidPassword(password1)) {
      setAlert('Password must be at least six characters long', 'danger');
      return;
    } else {
      signUpRef.current.callSignUpMutation({
        firstName,
        lastName,
        email,
        password: password1
      });
    }
  };

  return (
    <Page>
      <SignUp
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
      />
      <AuthButtonContainer provider='google' buttonText='Sign Up with Google' />
      <AuthButtonContainer
        provider='facebook'
        buttonText='Sign Up with Facebook'
      />
      Already have an account ? <Link to='/signin'>Sign In</Link>
      <SignUpMutation ref={signUpRef} resetForm={resetForm} />
    </Page>
  );
};

export default connect(null, { setAlert })(SignUpContainer);
