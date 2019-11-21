import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { Snackbar } from '@material-ui/core';
import CustomAlert from './components/CustomAlert';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
      <CustomAlert variant='success' message='success' />
    </div>
  );
}

export default App;
