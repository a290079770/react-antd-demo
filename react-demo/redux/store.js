import { createStore,applyMiddleware,combineReducers} from 'redux';
import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import Wrap from '../todolist/Wrap.js';
import '../todolist/index.css';
import createLogger from 'redux-logger';
import {
  addTodo,
  setComplated,
  setShowType,
  setId
} from './action.js'
//action
import {fn} from './reducer.js';
import thunk from 'redux-thunk'
//reducer

const logger = createLogger();
var store = createStore(
	fn,
	applyMiddleware(thunk,logger)
)

ReactDOM.render((
      <Provider store={store}>
         <Wrap/>
      </Provider> 
	),app)

