import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import {hashHistory} from 'react-router';
import logo from '../../assets/img/tximg.jpg';
const { Header, Sider, Content } = Layout;



export default class Admin extends Component {
  constructor(props) {
     super(props);
     this.state = {
       collapsed: false,
       menulist:[
       {
         path:'book',
         title:'图书管理',
         icon:'book',
         key:'1'
       },
       {
         path:'teacher',
         title:'教师管理',
         icon:'solution',
         key:'2'
       },
       {
         path:'emp',
         title:'员工管理',
         icon:'user',
         key:'3'
       },
       {
         path:'system',
         title:'系统管理',
         icon:'setting',
         key:'4'
       },
       ]
     };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }


  handleChangeMenuItem = ({ item, key, keyPath })=>{
    hashHistory.push('/wrap/admin/'+this.state.menulist[key - 1].path);
  }

  render() {
    let meunlist = [];
    meunlist = this.state.menulist.map((item)=>{
        return (
           <Menu.Item key={item.key} >
             <Icon type={item.icon} />
             <span>{item.title}</span>
           </Menu.Item>
        )
    })
    return (
      <div>
         <Layout className="admin">
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >
              <div className="logo" >
                 <img src={logo} alt="logo"/>
              </div>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.handleChangeMenuItem}>
                 {
                  meunlist
                 }
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </Header>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
      </div>
    );
  }
}


