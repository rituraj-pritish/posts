import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from '../../theme';
import './App.css';

import NavbarContainer from '../layout/navbar/NavbarContainer';
import FooterContainer from '../layout/footer/FooterContainer';
import HomeContainer from '../pages/home/home-page/HomeContainer';
import ScrollToTop from '../ScrollToTop';
import ToTopButton from '../layout/to-top-button/ToTopButton';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavbarContainer />
        <ScrollToTop>
          <Switch>
            <Route exact path='/' component={HomeContainer} />
          </Switch>
        </ScrollToTop>
        <FooterContainer />
      </Router>
      <ToTopButton />
    </ThemeProvider>
  );
};

export default App;
