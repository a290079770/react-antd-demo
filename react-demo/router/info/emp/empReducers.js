import {combineReducers} from 'redux';
import { GET_EMP_BY_PAGE } from './empAction.js' 

function emps(state={
            curPage:1,
          	maxPage:0,
          	eachPage:10,
          	count:0,
          	data:[]
     },action){
	   switch(action.type) {
		case GET_EMP_BY_PAGE:
			 return action.page			
        default:
             return state
	}

}

export default combineReducers({emps})
