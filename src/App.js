import React, { Component } from 'react';
import {Router,Route,hashHistory,IndexRoute} from 'react-router';

import Wrap from './components/wrap.js';
import Login from './components/login.js';
import Reg from './components/reg.js';

import './assets/css/App.css';

export default class App extends Component {
  render() {
    return (
        <Router history={hashHistory}>
          <Route path='/'>
            <IndexRoute component={Login} />
          </Route>
          <Route path='/wrap' component={Wrap}>
            <IndexRoute component={Login} />
            <Route path='login' component={Login}></Route>
            <Route path='reg' component={Reg}></Route>
          </Route>
        </Router>
    );
  }
}

