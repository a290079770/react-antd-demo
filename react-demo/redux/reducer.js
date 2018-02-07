import {combineReducers} from 'redux'
import {
ADDTODO,
Set_COMPLATED,
SHOWTYPE,
SET_ID,
} from './action.js'


function todolist(state=[
             {id:0,text:'HTML',complated:false},
             {id:1,text:'CSS',complated:true},
             {id:2,text:'JS',complated:false}
               ],action){
    switch(action.type){
     case ADDTODO:
        return [...state,{
          id:action.id,
          text:action.text,
          complated:false
        }];
     case Set_COMPLATED:
        return state.map((item)=>{
            if(item.id==action.id){
              if(item.complated){
                return Object.assign({},item,{complated:false})
              }else{
                return Object.assign({},item,{complated:true})
              }
              
            }else{
              return item
            }
          })
     default :
     return state   
    }
}  


function setShow(state,action){
  switch(action.type){
    case SHOWTYPE: 
       return action.showType
    default:
       return 'all'
  }
}

function setID(state=3,action){
  switch(action.type){
    case SET_ID:
        return ++state
    default :
        return state    
  }
}

export var fn = combineReducers({
       todolist,
       showType:setShow,
       index:setID
    })