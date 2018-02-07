import React from 'react';


class AddTodo extends React.Component{
	constructor(props){
      super(props)
	}
	render(){
		return (
            <div>
               <input ref='username' type='text'/>
               <input type='button' value='addTodo' onClick={
               	()=>{
               		this.props.addlist(this.refs.username.value)
               		this.refs.username.value=''
               	}}/> 
            </div>      
	     )
	}
}

export default AddTodo


