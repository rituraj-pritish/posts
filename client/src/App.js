import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress } from '@material-ui/core';

import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import CustomAlert from './components/CustomAlert';
import Navbar from './components/Navbar';
import CreatePost from './components/CreatePost';
import { setUser, authError } from './actions/auth';
import { getUserByTokenQuery } from './graphql/queries';
import Post from './components/Post';
import PrivateRoute from './components/PrivateRoute';

const token = window.localStorage.getItem('token') || '';

const App = ({ alert, auth, authError, setUser }) => {
  const { loading, error, data } = useQuery(getUserByTokenQuery, {
    variables: { token }
  });

  useEffect(() => {
    if (error) {
      authError();
    }

    if (data && data.getUserByToken) {
      setUser(data.getUserByToken);
    }
    // eslint-disable-next-line
  }, [loading, error, data]);

  if (auth.loading) {
    return <CircularProgress />;
  }
  return (
    <Container>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/create-post' component={CreatePost} />
          <Route exact path='/post/:postId' component={Post} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
      {alert.length !== 0 && (
        <CustomAlert variant={alert[0].variant} message={alert[0].message} />
      )}
    </Container>
  );
};

const mapStateToProps = state => ({
  alert: state.alert,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setUser, authError }
)(App);
