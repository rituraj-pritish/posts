import React, { useState, lazy, Suspense, useRef } from 'react';
import formValidator from '../../../utils/formValidator';
import { authError } from '../../../redux/actions/userActions';
import setAlert from '../../../utils/setAlert';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import Page from '../../common/Page';
import ComponentLoader from '../../ComponentLoader';
import { StyledSocialAuth } from './SignUp.styles';

//dynamic imports
const SignUpForm = lazy(() => import('./SignUpForm'));
const SignUpMutation = lazy(() => import('./SignUpMutation'));
const AuthButtonContainer = lazy(() =>
  import('../../auth-button/AuthButtonContainer')
);
const Logo = lazy(() => import('../../../assets/Logo'));
const Div = lazy(() => import('../../common/Div'));
const Text = lazy(() => import('../../common/Text'));

const SignUpContainer = ({ authError, isAuth }) => {
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
      <Suspense fallback={<ComponentLoader />}>
        <Div maxWidth='500px' m='0 auto' textAlign='center'>
          <Link to='/'>
            <Logo />
          </Link>

          <StyledSocialAuth>
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
          </StyledSocialAuth>

          <Text mt='2rem'>or</Text>
          <Text mt='1rem' mb='2rem' text>
            Sign up using email
          </Text>

          <SignUpForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formData={formData}
          />

          <Div m='2rem 0'>
            Already have an account ?{' '}
            <Text inline color='blue' style={{ textDecoration: 'underline' }}>
              <Link to='/signin'>Sign In</Link>
            </Text>
          </Div>
          <SignUpMutation ref={signUpRef} resetForm={resetForm} />
        </Div>
      </Suspense>
    </Page>
  );
};

const mapStateToProps = state => ({
  isAuth: state.user.isAuth
});

export default connect(mapStateToProps, { authError })(SignUpContainer);
