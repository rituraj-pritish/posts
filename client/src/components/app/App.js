import React, { memo, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import ReactNotification from 'react-notifications-component';
import { useLazyQuery } from '@apollo/react-hooks';

import 'react-notifications-component/dist/theme.css';
import theme from '../../theme';
import './App.css';

import { getUserByTokenQuery } from '../../graphql/queries/userQueries';
import { authError, authSuccess } from '../../redux/actions/userActions';
import PrivateRoute from '../PrivateRoute';
import NavbarContainer from '../layout/navbar/NavbarContainer';
import FooterContainer from '../layout/footer/FooterContainer';
import HomeContainer from '../pages/home/home-page/HomeContainer';
import ScrollToTop from '../ScrollToTop';
import ToTopButton from '../layout/to-top-button/ToTopButton';
import SignUpContainer from '../pages/sign-up/SignUpContainer';
import SignInContainer from '../pages/sign-in/SignInContainer';

const App = ({ authLoading, authError, authSuccess }) => {
  const token = window.localStorage.getItem('token');

  const [getUser, { loading, error, data }] = useLazyQuery(getUserByTokenQuery);

  useEffect(() => {
    if (!token) {
      authError();
    } else {
      getUser({ variables: { token } });
    }
  }, []);

  if (data && data.getUserByToken) authSuccess(data.getUserByToken);
  if (error) authError();

  if (authLoading) {
    return 'app loader';
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavbarContainer />
        <ScrollToTop>
          <Switch>
            <Route exact path='/' component={HomeContainer} />
            <Route exact path='/signup' component={SignUpContainer} />
            <Route exact path='/signin' component={SignInContainer} />
            <PrivateRoute exact path='/post/create-post' component={SignInContainer} />
          </Switch>
        </ScrollToTop>
        <FooterContainer />
      </Router>
      <ReactNotification />
      <ToTopButton />
    </ThemeProvider>
  );
};

const mapStateToProps = state => ({
  authLoading: state.user.loading
});

export default connect(mapStateToProps, { authError, authSuccess })(memo(App));
