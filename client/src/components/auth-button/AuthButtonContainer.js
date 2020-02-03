import React from 'react';
import AuthButton from './AuthButton';

const AuthButtonContainer = ({
  provider,
  buttonText,
  type,
  signInRef,
  signUpRef,
  authError
}) => {
  const facebookResponse = res => {
    if (res.userID && type === 'signin') {
      const { email, userID } = res;
      signUpRef.current.callSocialSignInQuery({
        email,
        providerId: userID
      });
    } else if (res.userID && type === 'signup') {
      const { email, name, userID } = res;
      const firstName = name.split(' ')[0];
      const lastName = name.split(' ').slice(-1)[0];
      signUpRef.current.callSocialSignUpMutation({
        email,
        firstName,
        lastName,
        provider: 'facebook',
        providerId: userID
      });
    } else {
      authError();
    }
  };

  const googleResponse = res => {
    if (res.profileObj && type === 'signin') {
      const { email, googleId } = res.profileObj;
      signInRef.current.callSocialSignInQuery({
        email,
        providerId: googleId
      });
    } else if (res.profileObj && type === 'signup') {
      const { email, googleId, familyName, givenName } = res.profileObj;
      signUpRef.current.callSocialSignUpMutation({
        email,
        providerId: googleId,
        firstName: givenName,
        lastName: familyName,
        provider: 'google'
      });
    } else {
      authError();
    }
  };

  return (
    <AuthButton
      buttonText={buttonText}
      provider={provider}
      googleResponse={googleResponse}
      facebookResponse={facebookResponse}
    />
  );
};

export default AuthButtonContainer;
