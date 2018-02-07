import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk'

import Emp from './emp.js';
import emps from './empReducers.js';
import {asyncGetEmp} from './empAction.js';
import {addEmp1} from './empAction.js';

 

const logger = createLogger();
const store = createStore(
      emps,
      applyMiddleware(thunk,logger)
	)

ReactDOM.render((
     <Provider store={store}>
        <Emp />
     </Provider>
	),app)

