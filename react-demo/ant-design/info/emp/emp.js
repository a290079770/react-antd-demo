import React from 'react';
import { Menu, Icon , Row , Col } from 'antd';
import {hashHistory} from 'react-router';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Emp extends React.Component{
	constructor(props){
		super(props)
		this.state={
			current:'showEmp'
		}
	}

	handleClick(key){
    	this.setState({
    		  current:key.key
    	})
    	hashHistory.push(`/info/emp/${key.key}`)
    }

	render(){
		return(
          <div>
              <Row>
			      <Col span={4}>
                     <Menu onClick={(key)=>this.handleClick(key)}
				        selectedKeys={[this.state.current]}
				      >    
				           <Menu.Item key="showEmp">
					            <Icon type="windows-o" />显示所有员工
					        </Menu.Item>
			               <Menu.Item key="addEmp">
					            <Icon type="plus" />新增员工
					        </Menu.Item>
					        <Menu.Item key="searchEmp">
					            <Icon type="search" />查询员工
					        </Menu.Item>
			          </Menu>
			      </Col>
			      <Col span={20}>{this.props.children}</Col>
		      </Row>
          </div>
		)
	}
}