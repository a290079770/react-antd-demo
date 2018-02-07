import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {hashHistory} from 'react-router';

import axios from 'axios';
import baseURL from '../config.js';
axios.defaults.baseURL = baseURL;
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
         axios.post('/users/login',values).then(res=>{
            console.log(res);
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
            {getFieldDecorator('userName', {
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



