import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { loginQuery } from '../../../graphql/queries/authQueries';
import { connect } from 'react-redux';

import {
  authSuccess,
  authError,
  setAlert
} from '../../../redux/actions/userActions';

const SignInQuery = (props, ref) => {
  const { authError, authSuccess, setAlert,resetForm } = props;
  const [login, { loading, error, data }] = useLazyQuery(loginQuery);
  // if (loading) return 'loading';

  useImperativeHandle(ref, () => ({
    callLoginQuery(data) {
      login({ variables: data });
    }
  }));

  useEffect(() => {
    if (error) {
      setAlert(error.graphQLErrors[0].message, 'danger');
      authError();
    }

    if (data && data.login) {
      resetForm();
      setAlert('Login successful','success')
      console.log(data);
    }
  }, [loading, error, data]);

  return <div>hi{loading && 'spinner'}</div>;
};

export default connect(null, { authSuccess, authError, setAlert }, null, {
  forwardRef: true
})(forwardRef(SignInQuery));
