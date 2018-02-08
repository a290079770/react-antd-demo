import React from 'react';
import { Form, Icon, Input, Button ,message} from 'antd';
import {hashHistory} from 'react-router';

import axios from '../config.js';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
         //需要再次验证两次密码是否一致
         if(!values.password || values.password !== values.confirePwd) {
            message.error('两次输入的密码不一致！');
            return;
         }

         delete values.checkPwd;
         //发起注册请求
         axios.post('/users/reg',values).then(res=>{
            if(res.data.Success) {
               message.success('注册成功！');
               setTimeout(()=>{
                  hashHistory.push('/wrap/login/'+res.data.Data.username);
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
    let checkPwd = (rule, value, callback) => {
        const form = this.props.form;
        if (!value || value !== form.getFieldValue('password')) {
          callback('两次输入的密码不一致！');
        } else {
          callback();
        }
    }
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
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
            {getFieldDecorator('confirePwd', {
              rules: [{ required: true, message: '请再次输入密码！' },{
                validator:checkPwd
              }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请再次输入密码！" />
            )}
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              注册
            </Button>

            <Button className="login-form-button" onClick={()=>hashHistory.push('/wrap/login')}>
              去登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(NormalLoginForm);



