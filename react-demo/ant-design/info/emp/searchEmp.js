import React from 'react';
import { Input, Select, Icon, Row , Col , Button } from 'antd';


const Option = Select.Option;


export default class SearchEmp extends React.Component{
	constructor(props){
		super(props)
	}

	searchEmp(e){
		console.log(this.refs.searchInfo)
		console.log(this.refs.searchInfo.refs.input.value)
	}

	render(){
		const selectBefore = (
		  <Select defaultValue="empName" style={{ width: 80 }}>
		    <Option value="empName">按姓名</Option>
		    <Option value="empSal">按工资</Option>
		    <Option value="empJob">按岗位</Option>
		  </Select>
		);

        const selectAfter = (<Button onClick={(e)=>this.searchEmp(e)} icon="search" >Search</Button>)

		return (

            <div>
              <Row  style={{ marginTop: 50 }}>
			      <Col span={4}></Col>
			      <Col span={16}>
					  <div>
				      	<Input ref='searchInfo' addonBefore={selectBefore} 
                        addonAfter = {selectAfter}
				      	defaultValue="请输入搜索信息" style={{height:40,fontSize:16}}/>

				      </div>
			      </Col>
			      <Col span={4}></Col>
		      </Row>
		              
            </div>
		)
	}
}