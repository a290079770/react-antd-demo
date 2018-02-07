import React from 'react';
import { Row , Col , Form , Input , Button,message, Modal} from 'antd';
import {hashHistory} from "react-router";

const FormItem = Form.Item


class Reg extends React.Component{
	constructor(props){
		super(props);
		this.state={
			passwordDirty: false,
			disAbled:true
		}
	}

    goLogin(){
    	hashHistory.push(`/`)
    }

    handleSubmit(e) {
	    e.preventDefault();
	    this.props.form.validateFieldsAndScroll((err, values) => {
	      if (!err) {
	        // console.log('Received values of form: ', values);
	        // hashHistory.push(`/login/${values.email}`)
	        // 
	        fetch("/users/reg", {
				    method: "POST",
				    headers: {
				        "Content-Type": "application/x-www-form-urlencoded"
				    },
				    body: `userName=${values.userName}&password=${values.password}`,
					credentials: 'include'
				}).then(function(response) {
				    return response.json();
				}).then((data)=>{
					if(eval(data)){
                        Modal.success({
						    title: '注册成功',
						    content: '点击去登录！',
						    onOk() {
						    hashHistory.push(`/login/${values.userName}`)
						    }
						  });
                        
					}else{
						Modal.error({
						    title: '注册失败！'
						  });
					}
				});
	      }
	    });
	  }

    checkPassowrd(rule, value, callback) {
	    const form = this.props.form;
	    if (value && value !== form.getFieldValue('password')) {
	      callback('两次密码输入不一致!');
	    } else {
	      callback();
	    }
    }

    checkConfirm(rule, value, callback) {
	    const form = this.props.form;
	    if (value && this.state.passwordDirty) {
	      form.validateFields(['confirm'], { force: true });
	    }
	    callback();
     }

     handleUserNameBlur(e){
     	fetch("/users/isUsed", {
				    method: "POST",
				    headers: {
				        "Content-Type": "application/x-www-form-urlencoded"
				    },
				    body: `userName=${e.target.value}`,
					credentials: 'include'
				}).then(function(response) {
				    return response.json();
				}).then((data)=>{
					if(eval(data)){
                       this.setState({
                       	disAbled:false
                       })
					}else{
						this.setState({
                        	disAbled:true
                       })
						 Modal.warning({
						    title: '该用户名已被注册'
						  });
					}
			});
     }

     handlePasswordBlur(e) {
	    const value = e.target.value;
	    this.setState({ passwordDirty: this.state.passwordDirty || !!value });
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
					          hasFeedback={!this.state.disAbled}
					        >
					          {getFieldDecorator('userName', {
					            rules: [ {
					              required: true, message: '请输入您的用户名!',
					            },{
					            	min:6,max:18,message:'用户名6到18个字符'
					            }],
					          })(
					            <Input onBlur={(e)=>this.handleUserNameBlur(e)}/>
					          )}
					        </FormItem>

					        <FormItem
					          {...formItemLayout}
					          label="密 码"
					          hasFeedback
					        >
					          {getFieldDecorator('password', {
					            rules: [{
					              required: true, message: '请输入您的密码',
					            }, {
					              validator:(rule, value, callback)=>this.checkConfirm(rule, value, callback)
					            }],
					          })(
					            <Input type="password" onBlur={(e)=>this.handlePasswordBlur(e)} />
					          )}
					        </FormItem>

                            <FormItem
					          {...formItemLayout}
					          label="确认密码"
					          hasFeedback
					        >
					          {getFieldDecorator('confirm', {
					            rules: [{
					              required: true, message: '请确认您的密码!',
					            }, {
					              validator: (rule, value, callback)=>this.checkPassowrd(rule, value, callback),
					            }],
					          })(
					            <Input type="password" />
					          )}
					        </FormItem>

					        <FormItem {...tailFormItemLayout}>
					          <Button type="primary" htmlType="button" size="large" disabled={this.state.disAbled} onClick={(e)=>this.handleSubmit(e)}>注册</Button>
					          <Button type="primary" htmlType="button" size="large" style={{marginLeft:20}} onClick={()=>this.goLogin()}>登录</Button>
					        </FormItem>
                       </Form>
			      </Col>
			      <Col span={3}></Col>
             </Row>
           </div>
		)
	}
}

export default Form.create()(Reg)