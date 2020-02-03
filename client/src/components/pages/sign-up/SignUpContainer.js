import React, { useState, useEffect, useRef } from 'react';
import formValidator from '../../../utils/formValidator';
import { setAlert, authError } from '../../../redux/actions/userActions';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import Page from '../../common/Page';
import Logo from '../../../assets/Logo';
import SignUp from './SignUpForm';
import AuthButtonContainer from '../../auth-button/AuthButtonContainer';
import SignUpMutation from './SignUpMutation';
import Div from '../../common/Div';
import Text from '../../common/Text';

const SignUpContainer = ({ setAlert, authError, isAuth }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password1: '',
    password2: ''
  });
  const { firstName, lastName, email, password1, password2 } = formData;

  const signUpRef = useRef();

  if (isAuth) {
    return <Redirect to='/' />;
  }

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
    <Page m='1rem 0' pb='0'>
      <Div maxWidth='500px' m='0 auto' textAlign='center'>
        <Link to='/'>
          <Logo />
        </Link>
        <SignUp
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formData={formData}
        />

        <Text m='0.5rem 0'>or</Text>

        <Div display='grid' gridTemplateColumns='1fr 1fr' gridGap='2rem'>
          <AuthButtonContainer
            provider='google'
            buttonText='Sign Up with Google'
            type='signup'
            signUpRef={signUpRef}
            authError={authError}
          />
          <AuthButtonContainer
            provider='facebook'
            buttonText='Sign Up with Facebook'
            type='signup'
            signUpRef={signUpRef}
            authError={authError}
          />
        </Div>
        <Text m='2rem 0'>
          Already have an account ? <Link to='/signin'>Sign In</Link>
        </Text>
        <SignUpMutation ref={signUpRef} resetForm={resetForm} />
      </Div>
    </Page>
  );
};

const mapStateToProps = state => ({
  isAuth: state.user.isAuth
});

export default connect(mapStateToProps, { setAlert, authError })(
  SignUpContainer
);
