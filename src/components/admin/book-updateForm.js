import React from 'react';
import axios from '../../config.js';

import { Modal,Form, Icon, Input, Button,message,DatePicker} from 'antd';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const FormItem = Form.Item;

class BookUpdateForm extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       curId:'',
       text:'2222'
     };
  }

  
  //获取图书详情
  getBookDetail(id) {
    let _this = this;
    axios.get('/book/detail',{
      params:{id:id}
    }).then(res=>{
        console.log(res.data)
        if(res.data.Success) {
           _this.props.form.setFields(res.data.Data);
        }else {
           message.error(res.data.Description);
        }
     })
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
         axios.post('/book/update',Object.assign({id:this.props.updateData._id},values)).then(res=>{
            console.log(res.data)
            if(res.data.Success) {
               message.success('修改图书成功！');
               this.props.form.resetFields();
               this.props.hideModal(true);
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
          title="修改图书"
          style={{ top:200 }}
          visible={this.props.isUpdateModalShow}
          cancelText="取消"
          okText="修改"
          closable={false}
          destroyOnClose={true}
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
                  <Input placeholder="请输入书名！"/>
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

//表单赋初始值

export default Form.create({
  mapPropsToFields(props) {
    if(!props.updateData) return {}
    return {
      title: Form.createFormField({
         value:props.updateData.title
      }),
      author: Form.createFormField({
         value:props.updateData.author
      }),
      publisher: Form.createFormField({
         value:props.updateData.publisher
      }),
      publishDate: Form.createFormField({
         value:moment(props.updateData.publishDate,'YYYY-MM-DD')
      })
    }
  },
})(BookUpdateForm);