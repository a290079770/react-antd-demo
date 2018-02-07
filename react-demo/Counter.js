import React from 'react';
import ReactDOM from 'react-dom';

// class Counter extends React.Component{
//     constructor(props){
//      super(props);
//      this.state={
//      	count:0
//      } 
//     }
    
//     clickHandle(){

//     	this.setState({
//     		count:++this.state.count
//     	})
    	
//     	// this.state.count++;
//     	// this.forceUpdate();
//     	//上面注释的代码效果也是一样
//     } 
//    //这个函数会重新调用render函数
//    //this.setState内部的机制会去调用render方法
//    //this.forceUpdate()这个是强制执行render方法
//     render(){
//     	return (
// 	         <div>
// 	             <h1>您一共点击了 { this.state.count } 次</h1>
//                  <input type='button' onClick={()=>{  
//                  	//这里必须用箭头函数，固化this，一直指向counter里的constuctor
//                  	this.clickHandle()
//                  }} value='点击'/>
// 	         </div>
//          )
//      }

// }


 // class Counter extends React.Component{
 // 	 constructor(props){
 // 	 	super(prop)
 // 	 }

 // 	 render(){

 // 	 }
 // }

class Counter extends React.Component{  //这里设置容器组件
	constructor(props){
      super(props);    //ES6 规定继承必须有super后才能调用this
      this.state = {
      	count:0
      }
	} 
    
    clickHandle(){
    	this.setState({
    		count:++this.state.count
    	})
    	// this.state.count++;
    	// this.forceUpdate()
    }
 
	render(){
	   return (
            <div>
               <ShowCount count={this.state.count}/>
     //调用ShowCount展示组件，可以将自身的属性以属性的方式传给子组件
               <SetCount SetCount={()=>{
               	this.clickHandle()
               }}/>
     //调用SetCount展示组件，也可以将自己的方法通过箭头函数的形式传递(注意必须是箭头函数，固化this)  
            </div>
	   	)
	}
} 


 class ShowCount extends React.Component{
 	 constructor(props){
 	 	super(props)
       //props用来接收上级组件传过来的数据，本身是个空对象，可以接收属性和方法
 	 }
 	 render(){
 	 	return (
                 <h1>您一共点击了 {this.props.count} 次</h1>
 	 		)            
 	 }
 }

class SetCount extends React.Component{
	constructor(props){
      super(props)
   
	}

	render(){
		return(
			 <div>
               <input type='text'/>
               <input type='button' onClick={()=>{
               	this.props.SetCount()
               }} value='点击'/>

            //注意：调用props里上级传过来的方法的时候，为了this有明确的指向，必须要用箭头函数    
             </div>  
			)
    }
}

ReactDOM.render(<Counter />,app)  