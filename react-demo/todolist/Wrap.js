import React from 'react';
import ReactDOM from 'react-dom';
import AddTodo from './addTodo.js';
import Todolist from './todolist.js';
import Filter from './Filter.js';
import './index.css';
import {connect} from 'react-redux';
import {
    addTodo,
    setComplated,
    setShowType,
    setId,
    STATE,
    addTodo1
} from '../redux/action.js'

let {addTodo1:addlist,setComplated:clickComplated,setShowType:showList} = {
    addTodo,
    setComplated,
    setShowType,
    setId,
    STATE,

}


 class Wrap extends React.Component{
 	constructor(props){
 		super(props);
 	}

 	render(){
 		return (
 			      <div>
               <input type='button' value='click' onClick={()=>{
                  new Promise(function(resolve,reject){
                    setTimeout(()=>console.log(1),1000)
                    resolve('zhangsan')
                  })
                  .then(function(){
                    return new Promise((resolve,reject)=>{
                      setTimeout(()=>{
                        console.log(2);
                        resolve('HTML CSS JS')
                      },2000)
                    })
                  })
                  .then(()=>{
                    return new Promise((resolve,reject)=>{
                      setTimeout(()=>console.log(3),3000)
                    })
                     
                  }) 
               }}/>
               <AddTodo addlist={(text)=>{
               	 this.props.dispatch(addTodo1(text,this.props.index))
               }}/>
               <Todolist 
               todolist ={this.props.todolist} 
               clickComplated={(id)=>{this.props.dispatch(clickComplated(id))}} 
               />
               <Filter showType={this.props.showType} setShowType={(showType)=>{
               	 this.props.dispatch(showList(showType))
               }}/>
            </div>  
 			)
 	}
 }

function filter(todolist,showType){
   switch(showType) {
     case 'all': return todolist;
                 
     case 'complated': return todolist.filter((item)=>item.complated);

     case 'active': return todolist.filter((item)=>!item.complated);
     }
}

function select(state) {

  return { todolist:filter(state.todolist,state.showType),
           showType:state.showType,
            index: state.index}
}

export default connect(select)(Wrap)