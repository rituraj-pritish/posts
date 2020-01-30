import React from 'react';
import AuthButton from './AuthButton';

const AuthButtonContainer = ({ provider, buttonText }) => {
  const facebookResponse = res => {
    console.log(res);
  };

  const googleResponse = res => {
    // console.log(res);
    console.log(res.profileObj);
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
