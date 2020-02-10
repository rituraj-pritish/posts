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
import PostContainer from '../pages/post/post/PostContainer';
import EditPostContainer from '../pages/edit-post/EditPostContainer';
import ComponentLoader from '../ComponentLoader';
import UserPostsContainer from '../pages/user-posts/UserPostsContainer';
import TagPostsContainer from '../pages/tag-posts/TagPostsContainer';

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
    return <ComponentLoader />;
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
            <Route exact path='/post/:postId' component={PostContainer} />
            <Route exact path='/posts/:tag' component={TagPostsContainer} />
            <Route
              exact
              path='/posts/:name/:userId'
              component={UserPostsContainer}
            />
            <PrivateRoute
              exact
              path='/create-post'
              createPost={true}
              component={EditPostContainer}
            />
            <PrivateRoute
              exact
              path='/edit-post/:postId'
              component={EditPostContainer}
            />
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
