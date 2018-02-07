import React from 'react';
import ReactDOM from 'react-dom';
import { Row , Col , Form , Input , Button ,Modal} from 'antd';
import {hashHistory} from "react-router";

const FormItem = Form.Item

class Login extends React.Component{
	constructor(props){
		super(props)
		this.state={
			email:this.props.params.email?this.props.params.email:'hello'
		}
	}

    checkConfirm(rule, value, callback) {
	    const form = this.props.form;
	    if (value && this.state.passwordDirty) {
	      form.validateFields(['confirm'], { force: true });
	    }
	    callback();
     }

    handleSubmit(e) {
	    e.preventDefault();
	    this.props.form.validateFieldsAndScroll((err, values) => {
	      if (!err) {
	        // console.log('Received values of form: ', values);
	        
	        // 
	        fetch("/users/log", {
				    method: "POST",
				    headers: {
				        "Content-Type": "application/x-www-form-urlencoded"
				    },
				    body: `userName=${values.userName}&password=${values.password}`,
					credentials: 'include'
				}).then(function(response) {
				    return response.json();
				}).then((data)=>{
					if(eval(data.bool)){
						Modal.success({
						    title: '登录成功！',
						    onOk() {
						    hashHistory.push(`/info`)
						    }
						  });
					}else{
						Modal.error({
						    title: '账号或密码错误！',
						  });
					}
				});
	      }
	    });
	  }

    setUserName(value){
       console.log(value)
    }

    toRegister(){
    	hashHistory.push('/reg')
    }

	render(){
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
         };
        const tailFormItemLayout = {
		      wrapperCol: {
		        span: 14,
		        offset: 6,
		      },
		    };
		return (
           <div>
             <Row>
                  <Col span={3}></Col>
			      <Col span={18}>
                       <Form style={{marginTop:30}} horizontal>
                           <FormItem
					          {...formItemLayout}
					          label="用户名"
					        >
					          {getFieldDecorator('userName', {
					            rules: [{
					              required: true, message: '请输入用户名!',
					            }],
					          })(
					            <Input />
					          )}
					        </FormItem>

					        <FormItem
					          {...formItemLayout}
					          label="密码"
					        >
					          {getFieldDecorator('password', {
					            rules: [{
					              required: true, message: '请输入密码!',
					            }, {
					              validator:(rule, value, callback)=>this.checkConfirm(rule, value, callback)
					            }],
					          })(
					            <Input type="password"/>
					          )}
					        </FormItem>

					        <FormItem {...tailFormItemLayout}>
					          <Button type="primary" htmlType="button" size="large" onClick={(e)=>this.handleSubmit(e)}>登录</Button>
					          <Button type="primary" style={{marginLeft:20}} htmlType="button" size="large" onClick={()=>this.toRegister()}>注册</Button>
					        </FormItem>
                       </Form>
			      </Col>
			      <Col span={3}></Col>
             </Row>
           </div>
		)
	}
}

export default Form.create()(Login)