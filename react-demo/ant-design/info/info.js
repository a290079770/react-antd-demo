import React from 'react';
import { Menu, Icon } from 'antd';
import {hashHistory} from 'react-router';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Info extends React.Component{
	constructor(props){
		super(props);
		this.state={
			current:'commodity'
		}
	}

    handleClick(key){
    	this.setState({
    		  current:key.key
    	})
    	hashHistory.push(`/info/${key.key}`)
    }

	render(){
		return(
			<div>
	          <Menu onClick={(key)=>this.handleClick(key)}
		        selectedKeys={[this.state.current]}
		        mode="horizontal"
		      >
	               
			        <Menu.Item key="commodity">
			            <Icon type="shopping-cart" />商品管理
			        </Menu.Item>
			        
			        <Menu.Item key="emp">
			            <Icon type="user" />员工管理
			        </Menu.Item>
	          </Menu>
	          <div>{this.props.children}</div>
            </div>
		)
	}
}