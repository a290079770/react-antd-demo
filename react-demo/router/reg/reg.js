import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';
import $ from 'jquery';

class Reg extends React.Component{
	constructor(props){
		super(props)
	}
    
    reg(){
        var userName = this.refs.userName.value;
        $.ajax({
        	type:'POST',
        	url:'/users/reg',
        	data:{userName:this.refs.userName.value,
        	      password:this.refs.password.value },
        	success:function(data){
        		if(eval(data)){
        			alert('注册成功！')
        			hashHistory.push('/login/'+ userName)
        		}else{
        			alert('注册失败！')
        		}
        	}      
        }) 
    }



	render(){
		return (
          <div>
             <h1>注册页面</h1>	
               账号：<input type="text" name="userName" ref='userName'/><span></span><br/> 
			 	密码：<input type="password" ref='password' /><br/>
			 	<input type="button" name="" value="注册" onClick={()=>this.reg()} />
			 	<input type="button" name="" value="返回登录" /> 
          </div>
		)
	}
}

export default Reg