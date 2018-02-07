import React from 'react';
import { Menu, Icon , Row , Col } from 'antd';
import {hashHistory} from 'react-router';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Commodity extends React.Component{
	constructor(props){
		super(props)
		this.state={
			current:'addCommodity'
		}
	}

	handleClick(key){
    	this.setState({
    		  current:key.key
    	})
    	hashHistory.push(`/info/commodity/${key.key}`)
    }

	render(){
		return(
          <div>
              <Row>
			      <Col span={4}>
                     <Menu onClick={(key)=>this.handleClick(key)}
				        selectedKeys={[this.state.current]}
				      >
			               <Menu.Item key="addCommodity">
					            <Icon type="plus" />添加商品
					        </Menu.Item>
					        <Menu.Item key="getCommodity">
					            <Icon type="windows-o" />查看商品
					        </Menu.Item>
			          </Menu>
			      </Col>
			      <Col span={20}>{this.props.children}</Col>
		      </Row>
          </div>
		)
	}
}