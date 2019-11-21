import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import CustomAlert from './components/CustomAlert';
import Navbar from './components/Navbar';

function App({ alert }) {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
      {alert.length !== 0 && (
        <CustomAlert variant={alert[0].variant} message={alert[0].message} />
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps)(App);
