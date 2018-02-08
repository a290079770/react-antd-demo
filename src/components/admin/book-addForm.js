import React from 'react';
import axios from '../../config.js';

import { Modal,Form, Icon, Input, Button,message,DatePicker} from 'antd';

const FormItem = Form.Item;

class BookAddForm extends React.Component {
  constructor(props) {
     super(props);
     this.state = {

     };
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
         axios.post('/book/create',values).then(res=>{
            console.log(res.data)
            if(res.data.Success) {
               message.success('添加图书成功！');
               this.props.hideModal(false);
            }else {
               message.error(res.data.Description);
            }
         })
      }
    });
  }

  //显示关闭模态框
  setModalVisible(visible,add = false) {
    if(add) {
      this.handleSubmit();
    }else {
      //清除表单数据
      this.props.form.resetFields();
      this.props.hideModal(false);
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const left = 5;
    const right = 12;
    return (
      <Modal
          title="新增图书"
          style={{ top:200 }}
          visible={this.props.isAddModalShow}
          cancelText="取消"
          okText="新增"
          closable={false}
          onOk={() => this.setModalVisible(false,true)}
          onCancel={() => this.setModalVisible(false)}
        >
         <div className="book-add">
            <Form className="login-form book-form">
              <FormItem 
                label="书名"
                labelCol={{ span: left }}
                wrapperCol={{ span: right }}
              >
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: '请输入书名！' }],
                })(
                  <Input placeholder="请输入手机号或邮箱！" />
                )}
              </FormItem>
              <FormItem
                label="作者"
                labelCol={{ span: left }}
                wrapperCol={{ span: right }}
              >
                {getFieldDecorator('author', {
                  rules: [{ required: true, message: '请输入作者名！' }],
                })(
                  <Input placeholder="请输入作者名" />
                )}
              </FormItem>

              <FormItem
                label="出版社"
                labelCol={{ span: left }}
                wrapperCol={{ span: right }}
              >
                {getFieldDecorator('publisher', {
                  rules: [{ required: true, message: '请输入出版社名称！' }],
                })(
                  <Input placeholder="请输入出版社名称" />
                )}
              </FormItem>

              <FormItem
                label="出版时间"
                labelCol={{ span: left }}
                wrapperCol={{ span: right }}
              >
                {getFieldDecorator('publishDate', {
                  rules: [{ required: true, message: '请选择出版时间！' }],
                })(
                  <DatePicker placeholder="请选择出版时间！" />
                )}
              </FormItem>

            </Form>
          </div>
      </Modal>
      
    );
  }
}

export default Form.create()(BookAddForm);