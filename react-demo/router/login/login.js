import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';
import $ from 'jquery';

class Login extends React.Component{
	constructor(props){
		super(props)
	    this.state={
	    	userName:this.props.params.userName?this.props.params.userName:'zhangsan'
	    }
	}
 
    reg(){
    	hashHistory.push('/reg')
    }
 
    changeUser(){
    	this.setState({
           userName:this.refs.userName.value
    	})
    }

    login(){
    	// hashHistory.push('/info')
      if(this.refs.userName.value==''||this.refs.password.value==''){
         alert('账号和密码不能为空！')
      }else{
         $.ajax({
          type:'POST',
          url:'/users/log',
          data:{userName:this.refs.userName.value,
                password:this.refs.password.value },
          success:function(data){
            if(eval(data.bool)){
              hashHistory.push('/info')
            }else{
              alert('账号或密码错误！')
            }
          }      
        }) 
      }
  }

	render(){
		return (
          <div>
             <h1>登录页面</h1>
             	账号：<input type="text" ref='userName' value={this.state.userName} onChange={()=>this.changeUser()}/><br/> 
			 	密码：<input type="password" ref='password'/><br/>
			 	<input type="button"  value="登录" onClick={()=>this.login()}/>
			 	<input type="button"  value="注册" onClick={()=>this.reg()}/>
          </div>
		)
	}
}

export default Login