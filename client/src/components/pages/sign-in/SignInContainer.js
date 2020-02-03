import React, { useState, useEffect, useRef } from 'react';
import { setAlert } from '../../../redux/actions/userActions';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import formValidator from '../../../utils/formValidator';
import Logo from '../../../assets/Logo';
import Page from '../../common/Page';
import SignInForm from './SignInForm';
import SignInQuery from './SignInQuery';
import AuthButtonContainer from '../../auth-button/AuthButtonContainer';
import Div from '../../common/Div';
import Text from '../../common/Text';

const SignInContainer = ({ setAlert, isAuth }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const signInRef = useRef();

  if (isAuth) {
    return <Redirect to='/' />;
  }

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
      signInRef.current.callSignInQuery(formData);
    }
  };

  return (
    <Page m='1rem 0' pb='0'>
      <Div maxWidth='500px' m='0 auto' textAlign='center'>
        <Link to='/'>
          <Logo />
        </Link>
        <SignInForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formData={formData}
        />

        <Text m='0.5rem 0'>or</Text>

        <Div
          display='grid'
          gridTemplateColumns='1fr 1fr'
          gridGap='2rem'
        >
          <AuthButtonContainer
            provider='google'
            buttonText='Sign In with Google'
            type='signin'
            signInRef={signInRef}
          />
          <AuthButtonContainer
            provider='facebook'
            buttonText='Sign In with Facebook'
            signInRef={signInRef}
            type='signin'
          />
        </Div>
        <Text m='2rem 0'>
          New here ? <Link to='/signup'>Sign Up</Link>
        </Text>
        <SignInQuery ref={signInRef} resetForm={resetForm} />
      </Div>
    </Page>
  );
};

const mapStateToProps = state => ({
  isAuth: state.user.isAuth
});

export default connect(mapStateToProps, { setAlert })(SignInContainer);
