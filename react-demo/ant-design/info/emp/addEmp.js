import React from 'react';
import {Form , Input , Button , Select ,Menu, Dropdown, Icon, message } from 'antd';
import {hashHistory} from 'react-router';
import City from './city.js'
import GenderRadio from './radio.js'

const FormItem = Form.Item
const Option = Select.Option;
const OptGroup = Select.OptGroup;


class AddEmp extends React.Component{
	constructor(props){
		super(props)
		this.state={
			commName:'xxx',
			commType:'男鞋',
			commPrice:200,
			commSize:['36','37','38','39','40'],
			commPicUpload:true
		}
	}
   
    

    handleChangeType(value) {
		  this.setState({
		  	commType:value
		  })
		}

	handleChangeSize(value) {
		  this.setState({
		  	commSize:value
		  })
		}	

    handleSubmit(e) {
	    e.preventDefault();
	    this.props.form.validateFieldsAndScroll((err, values) => {
	      if (!err) {
		        fetch("/commodity/addCommodity", {
				    method: "POST",
				    headers: {
				        "Content-Type": "application/x-www-form-urlencoded"
				    },
				    body: `commodity=${JSON.stringify(this.state)}`,
					credentials: 'include'
				}).then(function(response) {
				    return response.json();
				}).then((data)=>{
					if(data){
						message.success('添加商品完成，请上传图片！')
						this.setState({
							commPicUpload:false
						})
					}
				});
	      }
	    });
	  } 

	setCommName(e){
       this.setState({
       	commName:e.target.value
       })
	}  

	setCommPrice(e){
       this.setState({
       	commPrice:e.target.value
       })
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

		var year = [];
		    for(var i = 100 ; i >= 0; i --){
		    	var values = 2016 - i;
		    	year.push( <Option key={i+'option'} value={values+''}>{values}</Option> )
		    } 
        var month = [];
            for(var i = 1 ; i <= 12; i ++){
		    	month.push( <Option key={i+'option'} value={i+''}>{i}</Option> )
		    } 
 
		return (
                 <div>
                   <p style={{marginTop:30,marginLeft:50}}>员工基本信息</p>
                   <Form style={{marginTop:30}} horizontal>
                       <FormItem
				          {...formItemLayout}
				          label='姓名'
				        >
				          {getFieldDecorator('empName', {
				            rules: [{
				              required: true, message: '请输入该员工姓名!',
				            }],
				          })(
				            <div>
					            <Input style={{width:50+'%'}}/>
				            </div>
				          )}
				        </FormItem>

				        <FormItem
				          {...formItemLayout}
				          label='性别'
				        >
				          <GenderRadio/>
				        </FormItem>

                        <FormItem
				          {...formItemLayout}
				          label='年龄'
				        >
				          {getFieldDecorator('empAge', {
				            rules: [{
				              required: true, message: '请输入该员工年龄!',
				            }],
				          })(
				            <div>
                               <Input type='number' style={{width:50+'%',marginRight:10}}/>
				            </div>
				          )}
				        </FormItem>


				        <FormItem
				          {...formItemLayout}
				          label='出生年月'	
				        >
				          {getFieldDecorator('empBirth', {
				            rules: [{
				              required: true, message: '请选择该员工的出生年月!'
				            }],
				          })(
				            <div>
				            	<Select defaultValue='2016'
								    style={{ width:100}}
								    showSearch={false}
								    onChange={(value)=>this.handleChangeType(value)}
								  >
								     {year.reverse()}  
						       </Select>
						       <Select defaultValue='1'
								    style={{ width:92,marginLeft:10 }}
								    showSearch={false}
								    onChange={(value)=>this.handleChangeType(value)}
								  >
							    {month}  
						     </Select>
				            </div>
				          )}
				        </FormItem>

				        <FormItem
				          {...formItemLayout}
				          label='籍贯'
				        >
				          {getFieldDecorator('empAddress', {
				            rules: [{
				              required: true, message: '请选择该员工的籍贯!'
				            }], 
				          })(
				            <City/>
				          )}
				        </FormItem>

				         <FormItem
				          {...formItemLayout}
				          label="电话"
				          
				        >{getFieldDecorator('empPhone', {
				            rules: [{
				              required: true, message: '请输入该员工电话!'
				            }], 
				          })(
				             <Input type='number' style={{width:50+'%',marginRight:10}}/>
				          )}
				        </FormItem>

                        <FormItem
				          {...formItemLayout}
				          label="E-mail"
				          
				        >
				          {getFieldDecorator('email', {
				            rules: [{
				              type: 'email', message: '不是有效的电子邮箱！',
				            }, {
				              required: true, message: '请输入该员工电子邮箱！',
				            }],
				          })(
				            <Input style={{width:50+'%'}}/>
				          )}
				        </FormItem>
                        
                  <p style={{marginTop:30,marginLeft:50}}>员工岗位信息</p>

                       <FormItem
				          {...formItemLayout}
				          label="岗位"
				          
				          style={{marginTop:30}}
				        >
				          {getFieldDecorator('empJob', {
				            rules: [{
				              required: true, message: '请输入该员工岗位！',
				            }],
				          })(
				            <Input style={{width:50+'%'}}/>
				          )}
				        </FormItem>

                        <FormItem
				          {...formItemLayout}
				          label="工资"
				          
				        >{getFieldDecorator('empSal', {
				            rules: [{
				              required: true, message: '请输入该员工工资!'
				            }], 
				          })(
				             <Input type='number' style={{width:50+'%',marginRight:10}}/>
				          )}
				        </FormItem>
                        
                        <FormItem {...tailFormItemLayout} >
					          <Button type="primary" htmlType="button" size="large" disabled={!this.state.commPicUpload} onClick={()=>hashHistory.push('/info/commodity/addCommodityImgs')}>员工照片</Button>
					    </FormItem> 

				        <FormItem {...tailFormItemLayout}>
					          <Button type="primary" htmlType="button" size="large" disabled={!this.state.commPicUpload} onClick={(e)=>this.handleSubmit(e)}>保存</Button>
					    </FormItem>
                 </Form>
           </div>
		)
	}
}


export default Form.create()(AddEmp)