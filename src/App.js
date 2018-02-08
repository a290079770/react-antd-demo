import React, { Component } from 'react';
import {Router,Route,hashHistory,IndexRoute} from 'react-router';

import Wrap from './components/wrap.js';
import Login from './components/login.js';
import Reg from './components/reg.js';
import Admin from './components/admin/admin.js';
import Book from './components/admin/book.js';
import Teacher from './components/admin/teacher.js';
import Emp from './components/admin/emp.js';
import Systems from './components/admin/system.js';

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
            <Route path='login' component={Login} name="登录"></Route>
            <Route path='login/:username' component={Login} name="登录带username"></Route>
            <Route path='reg' component={Reg} name="注册"></Route>
            <Route path='admin' component={Admin} name="管理后台">
               <IndexRoute component={Book} />
               <Route path='book' component={Book} name="图书列表"></Route>
               <Route path='teacher' component={Teacher} name="教师列表"></Route>
               <Route path='emp' component={Emp} name="员工列表"></Route>
               <Route path='system' component={Systems} name="系统列表"></Route>
            </Route>
          </Route>
        </Router>
    );
  }
}

