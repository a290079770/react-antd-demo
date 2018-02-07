import React from 'react';
import './emp.css'


class AddEmp extends React.Component{
	constructor(props){
		super(props)
	}
    render(){
    	return (
             <div>
             	<p><button onClick={()=>this.props.showAddp(this.refs.addP.className)}>+添加员工</button></p>
			 	<p className={this.props.AddpHide?"show":"hide"} ref="addP">
			 		<input type="text" placeholder="请输入员工姓名" ref='empName'/>
			 		<input type="number" placeholder="请输入工资" ref='empSal'/>
			 		<input type="text" placeholder="请输入岗位" ref='empJob'/>
			 		<button onClick={()=>this.props.addEmp1(this.refs.empName.value,this.refs.empSal.value,this.refs.empJob.value)}>确认</button>
			 		<button onClick={()=>this.props.cancle(this.refs.empName,this.refs.empSal,this.refs.empJob)}>取消</button>
			 	</p> 	
             </div>
    	)
    }
}

export default AddEmp