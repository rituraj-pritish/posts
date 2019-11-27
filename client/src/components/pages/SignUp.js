import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { setAlert } from '../../actions/alerts';
import { authError, authSuccess } from '../../actions/auth';
import { signupMutation } from '../../graphql/mutations';

const useStyles = makeStyles(theme => ({
  '@global': {
    '.side-panel': {
      display: 'none'
    },
    '.left-grid' : {
      maxWidth: '100%',
      flexBasis: '100%'
  }
  },
  paper: {
    marginTop: theme.spacing(2), // 1 === 8px
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignUp = ({
  alert,
  auth: { user, isAuth },
  setAlert,
  authError,
  authSuccess
}) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;

  //eslint-disable-next-line
  const [signup, { loading, error, data }] = useMutation(signupMutation);

  useEffect(() => {
    if (error) {
      setAlert(error.graphQLErrors[0].message, 'error');
      authError();
    }

    if (data && data.addUser) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      authSuccess(data.addUser);
      setAlert('Sign up successful', 'success');
    }
    //eslint-disable-next-line
  }, [error, data]);

  if (isAuth) {
    return <Redirect to='/dashboard' />;
  }

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (
      (firstName === '',
      lastName === '',
      email === '',
      password === '',
      confirmPassword === '')
    ) {
      setAlert('All fields are required', 'error');
      return;
    }

    if (password !== confirmPassword) {
      setAlert('Passwords does not match', 'error');
      return;
    }

    signup({ variables: { firstName, lastName, email, password } });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon color='primary' />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                value={firstName}
                label='First Name'
                autoFocus
                onChange={handleChange}
                color='secondary'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                value={lastName}
                autoComplete='lname'
                onChange={handleChange}
                color='secondary'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                value={email}
                autoComplete='email'
                onChange={handleChange}
                color='secondary'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                onChange={handleChange}
                value={password}
                color='secondary'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                id='password'
                value={confirmPassword}
                onChange={handleChange}
                color='secondary'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link to='/signin' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = state => ({
  alert: state.alert,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setAlert, authSuccess, authError }
)(SignUp);
