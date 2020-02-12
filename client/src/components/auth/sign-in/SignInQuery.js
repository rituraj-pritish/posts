import React, { forwardRef, useImperativeHandle } from 'react';
import { connect } from 'react-redux';
import { useLazyQuery } from '@apollo/react-hooks';

import ComponentLoader from 'src/components/shared/ComponentLoader'
import {
  signInQuery,
  socialSignInQuery
} from 'src/graphql/queries/userQueries';
import {
  authSuccess,
  authError
} from 'src/redux/actions/userActions';
import setAlert from 'src/utils/setAlert'

const SignInQuery = (props, ref) => {
  const { authError, authSuccess, resetForm } = props;

  let [signIn, { loading, error, data }] = useLazyQuery(signInQuery);
  let [
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

  if (error) {
    setAlert(error.graphQLErrors[0].message, 'danger');
    authError();
    window.location.reload();
  }

  if (socialError) {
    setAlert(socialError.graphQLErrors[0].message, 'danger');
    authError();
    window.location.reload();
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

  if (loading || socialLoading)
    return <ComponentLoader/>

  return null;
};

export default connect(null, { authSuccess, authError }, null, {
  forwardRef: true
})(forwardRef(SignInQuery));
