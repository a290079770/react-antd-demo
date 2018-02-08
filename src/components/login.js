import React  from 'react';
import { Form, Icon, Input, Button,message} from 'antd';
import {hashHistory} from 'react-router';

import axios from '../config.js';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  //给登录框附初始值
  //路由传值
  componentDidMount(){
    if(this.props.params.username) {
      this.props.form.setFieldsValue({
        username:this.props.params.username
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
         axios.post('/users/login',values).then(res=>{
            if(res.data.Success) {
               message.success('登录成功，即将跳转XXX管理系统！');
               setTimeout(()=>{
                  hashHistory.push('/wrap/admin');
               }, 1000)
            }else {
               message.error(res.data.Description);
            }
         })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem style={{marginTop:'50px'}}>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入账号！' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入手机号或邮箱！" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码！' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            <Button className="login-form-button" onClick={()=>hashHistory.push('/wrap/reg')}>
              注册
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(NormalLoginForm);



