import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { authError, authSuccess } from '../../actions/auth';
import { setAlert } from '../../actions/alerts';
import { loginQuery } from '../../graphql/queries';

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
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  textField: {

  }
}));

const SignIn = ({
  alert,
  auth: { user, isAuth },
  setAlert,
  authError,
  authSuccess
}) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  // eslint-disable-next-line
  const [login, { loading, error, data }] = useLazyQuery(loginQuery);

  useEffect(() => {
    if (error) {
      setAlert(error.graphQLErrors[0].message, 'error');
      authError();
    }

    if (data && data.login) {
      setFormData({
        email: '',
        password: ''
      });
      authSuccess(data.login);
      setAlert('Sign in successful', 'success');
    }
    // eslint-disable-next-line
  }, [error, data]);

  if (isAuth) {
    return <Redirect to='/dashboard' />;
  }

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if ((email === '', password === '')) {
      setAlert('All fields are required', 'error');
      return;
    }

    login({ variables: { email, password } });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon color='primary' />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
          color='secondary'
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            value={email}
            onChange={handleChange}
            autoFocus
            className={classes.textField}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            value={password}
            onChange={handleChange}
            autoComplete='current-password'
            color='secondary'
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link to='/signup' variant='body2'>
                {"Don't have an account? Sign Up"}
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
)(SignIn);
