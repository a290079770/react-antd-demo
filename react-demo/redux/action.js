export const ADDTODO = 'ADDTODO';
export const Set_COMPLATED = 'Set_COMPLATED';
export const SHOWTYPE = 'SHOWTYPE';
export const SET_ID = 'SET_ID';
export const STATE = {
    ALL:'all',
    COMPLATED:'complated',
    ACTIVE:'active'
}



export function addTodo(text,id){
  return{
    type:'ADDTODO',
    text,
    id
  }
}

export function addTodo1(text,id){
  return function(dispatch){
     dispatch(addTodo(text,id)) 
     dispatch(setId())
  }
}

export function setComplated(id){
  return{
    type:'Set_COMPLATED',
    id
  }
}


export function setShowType(showType){
    return{
      type:'SHOWTYPE',
      showType
    }
}

export function setId(){
  return {
     type:'SET_ID'
  }
}