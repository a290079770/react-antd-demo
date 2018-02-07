import React from 'react';
import { Table , Button} from 'antd';


export default class ShowEmp extends React.Component{
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
    	this.getEmpByPage()
    }  

    getEmpByPage({curPage=1,eachPage=10}={}){
       fetch("/emp/getEmpByPage", {
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

	render(){
		const columns = [{
		  title: '员工编号',
		  dataIndex: '_id',
		},{
		  title: '员工名称',
		  dataIndex: 'empName',
		}, {
		  title: '员工工资',
		  dataIndex: 'empSal',
		}, {
		  title: '员工岗位',
		  dataIndex: 'empJob',
		}, {
		  title: '操作',
		  render:()=> {
              return (
	              <div>
	              	 <Button style={{marginRight:3}} type="primary" htmlType="button" size="small">删除</Button>
	              </div>
              )
		  }
		}];


		const pagination = {
		  total: this.state.count,
		  showSizeChanger: true,
		  onShowSizeChange: (current, pageSize) => {
		    console.log('Current: ', current, '; PageSize: ', pageSize);
		    this.getEmpByPage({curPage:current,eachPage:pageSize})
		  },
		  onChange: (current) => {
		    console.log('Current: ', current);
		    this.getEmpByPage({curPage:current})
		  },
		};

		return(
             <Table columns={columns} dataSource={this.state.data} pagination={pagination} />
		)
	}
}
