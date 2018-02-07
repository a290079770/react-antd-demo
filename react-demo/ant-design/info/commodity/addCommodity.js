import React from 'react';
import {Form , Input , Button , Select ,Menu, Dropdown, Icon, message } from 'antd';
import {hashHistory} from 'react-router';

const FormItem = Form.Item
const Option = Select.Option;
const OptGroup = Select.OptGroup;

class AddCommodity extends React.Component{
	constructor(props){
		super(props)
		this.state={
			commName:'xxx',
			commType:'男鞋',
			commPrice:200,
			commSize:['36','37','38','39','40'],
			commPicUpload:true,
			commId:''
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
							commPicUpload:false,
							commId:data
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

		var size = [];
		var sizeValue = ['35','36','37','38','39','40']
		    for(var i = 0 ; i < sizeValue.length; i ++){
		    	size.push( <Option key={i+'option'} value={sizeValue[i]}>{sizeValue[i]}</Option> )
		    }  
		return (
                 <div>
                   <Form style={{marginTop:30}} horizontal>
                       <FormItem
				          {...formItemLayout}
				          label='商品名称'
				          hasFeedback
				        >
				          {getFieldDecorator('commName', {
				            rules: [{
				              required: true, message: '请输入您的商品名称!',
				            }],
				          })(
				            <Input onBlur={(e)=>this.setCommName(e)}/>
				          )}
				        </FormItem>

				        <FormItem
				          {...formItemLayout}
				          label='商品价格'

				        >
				          {getFieldDecorator('commPrice', {
				            rules: [{
				              required: true, message: '请输入您的商品价格!'
				            }],
				          })(
				            <Input type='number' style={{width:200}} onBlur={(e)=>this.setCommPrice(e)}/>
				          )}
				        </FormItem>

				         <FormItem
				          {...formItemLayout}
				          label="商品类型"
				          hasFeedback
				        >

                          <Select defaultValue='男鞋'
							    style={{ width: 200 }}
							    showSearch={false}
							    onChange={(value)=>this.handleChangeType(value)}
							  >
							      <Option value="男鞋">男鞋</Option>
							      <Option value="女鞋">女鞋</Option>
						  </Select>

				        </FormItem>

				        <FormItem
				          {...formItemLayout}
				          label="商品尺寸"
				          hasFeedback
				        >
				          <Select
							    multiple
							    style={{ width: '100%' }}
							    placeholder={"Please select"}
							    defaultValue={this.state.commSize[0]}
							    onChange={(value)=>this.handleChangeSize(value)}
							  >
							   {size} 
						  </Select>
				        </FormItem>
                        
                        <FormItem {...tailFormItemLayout}>
					          <Button type="primary" htmlType="button" size="large" disabled={this.state.commPicUpload} onClick={()=>hashHistory.push('/info/commodity/addCommodityImgs/'+this.state.commId)}>上传图片</Button>
					    </FormItem> 

				        <FormItem {...tailFormItemLayout}>
					          <Button type="primary" htmlType="button" size="large" disabled={!this.state.commPicUpload} onClick={(e)=>this.handleSubmit(e)}>保存</Button>
					    </FormItem>
                 </Form>
           </div>
		)
	}
}


export default Form.create()(AddCommodity)