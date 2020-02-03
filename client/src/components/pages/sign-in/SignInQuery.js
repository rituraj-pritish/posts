import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import {
  signInQuery,
  socialSignInQuery
} from '../../../graphql/queries/userQueries';
import { connect } from 'react-redux';

import {
  authSuccess,
  authError,
  setAlert
} from '../../../redux/actions/userActions';

const SignInQuery = (props, ref) => {
  const { authError, authSuccess, setAlert, resetForm } = props;

  const [signIn, { loading, error, data }] = useLazyQuery(signInQuery);
  const [
    socialSignIn,
    { loading: socialLoading, error: socialError, data: socialData }
  ] = useLazyQuery(socialSignInQuery);

  useImperativeHandle(ref, () => ({
    callSignInQuery(data) {
      signIn({ variables: data });
    },

    callSocialSignInQuery(data) {
      socialSignIn({ variables: data });
    }
  }));

  useEffect(() => {
    if (error) {
      setAlert(error.graphQLErrors[0].message, 'danger');
      authError();
    }

    if (socialError) {
      setAlert(socialError.graphQLErrors[0].message, 'danger');
      authError();
    }

    if (data && data.signIn) {
      resetForm();
      authSuccess(data.signIn);
      setAlert('Sign in successful', 'success');
    }

    if (socialData && socialData.socialSignIn) {
      authSuccess(socialData.socialSignIn);
      setAlert('Sign in successful', 'success');
    }
  }, [loading, error, data, socialLoading, socialError, socialData]);

  if (loading || socialLoading) return <div style={{color: 'orange', fontSize: '3rem'}}>SPINNER</div>;

  return null;
};

export default connect(null, { authSuccess, authError, setAlert }, null, {
  forwardRef: true
})(forwardRef(SignInQuery));
