import React from 'react' ;
import ReactDOM from 'react-dom';
import './index.css';
// import AddList from './lianxi/show1.js'
// import List from './lianxi/show2.js'

//  var Todolist = React.createClass({
// 	render(){

// 	   return(
//              <div>
//                 <input type='text'/><input type='button' value='addList'/>
//                 <br/>
//                 <ul>
//                    <li>HTML</li> 
//                    <li>CSS</li> 
//                    <li>JS</li> 
//                 </ul>
//              </div>
// 	   	)
// 	}
// })

// ES5创建一个组件的方法，将容器组件和展示组件结合在了一起

var Todolist = React.createClass({
     render(){
     	return (
             <div>
	             <AddList/>
	             <List />
             </div>

     		)		     
     }
})
//这里创建一个容器组件，将其他两个展示组件包裹进去



var List = React.createClass({
   	 render(){
   	 	return (
           
                <ul>
                   <li>HTML</li>
                   <li>CSS</li>
                   <li>JS</li>
                </ul>
             

   	 		)
   	 }
   })
   //这里创建一个展示组件

var AddList = React.createClass({
	render(){
		return (    
        <div><input type='text'/><input type='button' value='addList'/></div>
			) 
	}
})
//这里创建一个展示组件



ReactDOM.render(<Todolist />,app)