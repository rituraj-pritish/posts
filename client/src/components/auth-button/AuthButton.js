import React from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import './AuthButton.css'

const AuthButton = ({
  buttonText,
  provider,
  googleResponse,
  facebookResponse
}) => {
  
  const googleClientId =
    '222731938198-7r8snr92kodc4i6nq69nju17ss4b05ng.apps.googleusercontent.com';
  const fbClientId = '515596425734356';

  if (provider === 'google') {
    return (
      <GoogleLogin
        clientId={googleClientId}
        onSuccess={googleResponse}
        onFailure={googleResponse}
        className='google-auth-btn'
      >
        {buttonText}
      </GoogleLogin>
    );
  } else if (provider === 'facebook') {
    return (
      <FacebookLogin
        appId={fbClientId}
        callback={facebookResponse}
        textButton={buttonText}
        fields='name,email,picture'
        icon='fa-facebook'
        cssClass='facebook-auth-btn'
      />
    );
  }
};

export default AuthButton;
