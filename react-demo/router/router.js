import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,Link,hashHistory,IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,combineReducers} from 'redux';
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import emps from './info/emp/empReducers.js'
import {asyncGetEmp} from './info/emp/empAction.js'

import Login from './login/login.js';
import Reg from './reg/reg.js';
import Info from './info/info.js';
import Student from './info/student/student.js'
import Teacher from './info/teacher/teacher.js'
import Emp from './info/emp/emp.js'
import System from './info/system/system.js'


const logger = createLogger();
const store = createStore(
	emps,
	applyMiddleware(thunk,logger)
	)

ReactDOM.render((
	<Provider store={store}>
	  <Router history={hashHistory}>
	      <Route path='/' component={Login}></Route>
	      <Route path='/login/:userName' component={Login}></Route>
	      <Route path='/reg' component={Reg}></Route>
	      <Route path='/info' component={Info}>
	         <IndexRoute component={Emp} />
             <Route path='student' component={Student}></Route>
             <Route path='teacher' component={Teacher}></Route>
             <Route path='emp' component={Emp}></Route>
             <Route path='system' component={System}></Route>
	      </Route> 
      </Router>
    </Provider>  
	),app)
