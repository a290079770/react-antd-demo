import React from 'react';
import { Table , Button, Popconfirm} from 'antd';
import './commodity.css';
import {hashHistory} from "react-router"


export default class GetCommodity extends React.Component{
	constructor(props){
		super(props)
		this.state={
	        curPage:1,
	        eachPage:10,
	        maxPage:0,
	        count:0,
	        data:[]
		}
	}
    
    componentWillMount(){
    	this.getCommodityByPage()
    }  

    getCommodityByPage({curPage=1,eachPage=10}={}){
       fetch("/commodity/getCommodityByPage", {
				    method: "POST",
				    headers: {
				        "Content-Type": "application/x-www-form-urlencoded"
				    },
				    body: `curPage=${curPage}&eachPage=${eachPage}`,
					credentials: 'include'
				}).then(function(response) {
				    return response.json();
				}).then((data)=>{
					if(data){
						this.setState(data)
					}
			   });
    }
    showPics(index){
       hashHistory.push('/info/commodity/addCommodityImgs/'+index._id)
    }

    delCommodity(index){    
       fetch("/commodity/delCommodity", {
				    method: "POST",
				    headers: {
				        "Content-Type": "application/x-www-form-urlencoded"
				    },
				    body: `_id=${index._id}`,
					credentials: 'include'
				}).then(function(response) {
				    return response.json();
				}).then((data)=>{
					if(data){
						this.getCommodityByPage()
					}
			   });
    }

	render(){
		const columns = [{
		  title: '商品编号',
		  dataIndex: '_id',
		},{
		  title: '商品名称',
		  dataIndex: 'commName',
		}, {
		  title: '商品价格',
		  dataIndex: 'commPrice',
		}, {
		  title: '商品类型',
		  dataIndex: 'commType',
		}, {
		  title: '商品尺寸',
		  dataIndex: 'commSize',
		}, {
		  title: '操作',
		  
		  render:(record,index)=> {
              return (
	              <div>
                <Popconfirm title="确定删除该商品所有信息?" onConfirm={()=>this.delCommodity(index)}>
	              <Button style={{marginRight:3}} type="primary" htmlType="button" size="small">删除</Button>
	             </Popconfirm>
	              	 
	          	     <Button type="primary" htmlType="button" size="small" onClick={()=>this.showPics(index)}>查看图片</Button>
	              </div>
              )
		  }
		}];


		const pagination = {
		  total: this.state.count,
		  showSizeChanger: true,
		  onShowSizeChange: (current, pageSize) => {
		    this.getCommodityByPage({curPage:current,eachPage:pageSize})
		    this.setState({eachPage:pageSize})
		  },
		  onChange: (current) => {
		    console.log('Current: ', current);
		    this.getCommodityByPage({curPage:current,eachPage:this.state.eachPage})
		  },
		};

		return(
             <Table columns={columns} dataSource={this.state.data} pagination={pagination} />
		)
	}
}
