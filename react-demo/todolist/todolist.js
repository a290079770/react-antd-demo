import React from 'react';

class Todolist extends React.Component{
	constructor(props){
		super(props)
		
	}

	render(){
		return (
           <ul>
              {
               this.props.todolist.map((item,index)=>{ 
                  return <li className={item.complated?'complated':''}
                   key={index}
                   onClick={()=>this.props.clickComplated(item.id)}>
                   {item.text}
                   </li>
               })
              }
           </ul> 
		)
	}
}

export default Todolist