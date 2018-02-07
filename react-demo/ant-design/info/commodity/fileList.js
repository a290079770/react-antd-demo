import React from 'react';
import { Table } from 'antd';
import './commodity.css'

export default class FileList extends React.Component{
	constructor(props){
		super(props)
	}
    

	render(){
		const pagination = {
		  total: this.props.count,
		  showSizeChanger: true,
		  onShowSizeChange: (current, pageSize) => {
		    console.log('Current: ', current, '; PageSize: ', pageSize);
		    this.props.getCommImgsByPage({
		    	curPage:current,
		    	eachPage:pageSize,
		    	commId:this.props.commId
		    })
		  },
		  onChange: (current) => {
		    this.props.getCommImgsByPage({
		    	curPage:current,
		    	commId:this.props.commId
		    })
		  },
		};

		const columns = [{
		  title: '图片编号',
		  dataIndex: '_id',
		},{
		  title: '商品编号',
		  dataIndex: 'commId',
		}, {
		  title: '图片类型',
		  dataIndex: 'imgType',
		}, {
		  title: '图片预览',
		  dataIndex: 'src',
          render: text => <img style={{width:50}} src={text}/>
		}];

		return(
             <Table columns={columns} dataSource={this.props.data} pagination={pagination}/>
		)
	}
}