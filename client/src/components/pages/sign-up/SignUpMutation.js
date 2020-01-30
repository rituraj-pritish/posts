import React, { useRef,useEffect, forwardRef, useImperativeHandle } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';

import { signupMutation } from '../../../graphql/mutations/authMutations';
import {setAlert} from '../../../redux/actions/userActions'

const SignUpQuery = (props,ref) => {
  const {resetForm,setAlert} = props;
  const [signup, { loading, error, data }] = useMutation(signupMutation);

  useEffect(() => {
    if (error) setAlert(error.graphQLErrors[0].message, 'danger');

    if (data && data.signup) {
      resetForm()
      console.log(data);
    }
  }, [loading, error, data]);
  
  useImperativeHandle(ref,() => ({
    callSignUpMutation(data) {
      signup({variables: data})
    }
  }))
  
  if (loading) return 'loading';



  //todo loader if necessary
  return null;
};

export default connect(null, {setAlert}, null, { forwardRef: true })(
  forwardRef(SignUpQuery)
);
