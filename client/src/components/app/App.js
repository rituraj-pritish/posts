import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import { ThemeProvider } from 'styled-components';
import { useLazyQuery } from '@apollo/react-hooks';

import PrivateRoute from 'src/components/shared/PrivateRoute';
import ComponentLoader from 'src/components/shared/ComponentLoader';
import ScrollToTop from 'src/components/shared/ScrollToTop';
import ToTopButton from 'src/components/shared/ToTopButton';
import NavbarContainer from 'src/components/navbar/NavbarContainer';
import FooterContainer from 'src/components/footer/FooterContainer';
import HomeContainer from 'src/components/home/HomeContainer';
import SignUpContainer from 'src/components/auth/sign-up/SignUpContainer';
import SignInContainer from 'src/components/auth/sign-in/SignInContainer';
import PostContainer from 'src/components/posts/post/PostContainer';
import EditPostContainer from 'src/components/posts/edit-post/EditPostContainer';
import UserPostsContainer from 'src/components/posts/user-posts/UserPostsContainer';
import TagPostsContainer from 'src/components/posts/tag-posts/TagPostsContainer';
import PopularPosts from 'src/components/posts/popular-posts/PopularPosts';
import { getUserByTokenQuery } from 'src/graphql/queries/userQueries';
import { authError, authSuccess } from 'src/redux/actions/userActions';
import theme from 'src/theme';

//css imports
import 'react-notifications-component/dist/theme.css';
import './App.css';

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
            <Route exact path='/posts' component={PopularPosts} />
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
