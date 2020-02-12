import React, { forwardRef, useImperativeHandle } from 'react';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';

import ComponentLoader from 'src/components/shared/ComponentLoader';
import {
  signUpMutation,
  socialSignUpMutation
} from 'src/graphql/mutations/userMutations';
import { authError, authSuccess } from 'src/redux/actions/userActions';
import setAlert from 'src/utils/setAlert.js';

const SignUpQuery = (props, ref) => {
  const { resetForm, authSuccess, authError } = props;
  const [signUp, { loading, error, data }] = useMutation(signUpMutation);
  const [
    socialSignUp,
    { loading: socialLoading, error: socialError, data: socialData }
  ] = useMutation(socialSignUpMutation);

  if (error) {
    setAlert(error.graphQLErrors[0].message, 'danger');
    authError();
  }

  if (socialError) {
    setAlert(socialError.graphQLErrors[0].message, 'danger');
    authError();
  }

  if (data && data.signUp) {
    resetForm();
    authSuccess(data.signUp);
    setAlert('Sign Up Successful', 'success');
  }

  if (socialData && socialData.socialSignUp) {
    authSuccess(socialData.socialSignUp);
    setAlert('Sign Up Successful', 'success');
  }

  useImperativeHandle(ref, () => ({
    callSignUpMutation(data) {
      signUp({ variables: data });
    },

    callSocialSignUpMutation(data) {
      socialSignUp({ variables: data });
    }
  }));

  if (loading || socialLoading) return <ComponentLoader />;

  return null;
};

export default connect(null, { authError, authSuccess }, null, {
  forwardRef: true
})(forwardRef(SignUpQuery));
