import React from 'react';
import ReactDOM from 'react-dom';
import AddTodo from './todolist/addTodo.js';
import Todolist from './todolist/todolist.js';
import Filter from './todolist/Filter.js';
import './todolist/index.css'


 class App extends React.Component{
 	constructor(props){
 		super(props);
 		this.state = {
 			todolist:[
			 			 {id:0,text:'HTML',complated:false},
			 			 {id:1,text:'CSS',complated:true},
			 			 {id:2,text:'JS',complated:false}
 			         ],
 			index:3,
 			showType:'all'
 		}
 	}

    clickComplated(id){

       this.setState({
       	 todolist:this.state.todolist.map((item)=>{
       	 		if(item.id === id){
       	 		   if(item.complated){
                     return Object.assign({},item,{complated:false})
       	 		   }else{
       	 		   	 return Object.assign({},item,{complated:true})
       	 		   }	
       	 		}else{
       	 			return item
       	 		}
       	 	})
       })
    }
    //点击添加删除线

    addlist(text){
      this.setState({
      	todolist:[...this.state.todolist,{
      		id:this.state.index,
      		text:text,
      		complated:false
      	}],
      	index:++this.state.index,
      	showType:'all'
      })
    }
    //添加todolist

    showList(showType){

      this.setState({
      	showType:showType
      })
    }
    //切换选中状态

        
    showSettedList(showType){

      	 	switch(showType){
               case 'all': return this.state.todolist;
               case 'complated':return this.state.todolist.filter((item)=>item.complated);
               case 'active':return this.state.todolist.filter((item)=>!item.complated)
      	 	} 
      }
    
    //跟随状态显示

 	render(){
 		return (
 			<div>
               <AddTodo addlist={(text)=>{
               	 this.addlist(text)
               }}/>
               <Todolist 
               todolist={this.showSettedList(this.state.showType)} 
               clickComplated={(id)=>{this.clickComplated(id)}} 
               />
               <Filter showType={this.state.showType} setShowType={(showType)=>{
               	 this.showList(showType)
               }}/>
            </div>  
 			)
 	}
 }

 ReactDOM.render(<App />,app)