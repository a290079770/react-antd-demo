import React from 'react';


class Table extends React.Component{
	constructor(props){ 
		super(props)
	}

	render(){
		return (
           <div>
			 	<table>
			 		<thead>
			 			<tr>
			 				<th>员工编号</th>
			 				<th>员工姓名</th>
			 				<th>员工工资</th>
			 				<th>员工岗位</th>
			 				<th colSpan="2"> 操作</th>
			 			</tr>
			 		</thead>
			 		<tbody>
			 		   {
			 		   	this.props.data.map((item,index)=>{
			 		   		return <Rows data={item} key={index+'tr'} del={(empName,curPage)=>this.props.del(empName,curPage)} curPage={this.props.curPage}/>
			 		   	})
			 		   }
			 		</tbody>
			 	</table>
			 </div>
		)
	}
}


class Rows extends React.Component{
	constructor(props){
		super(props)
     
	}
 
	render(){
		return (
            <tr>
              <td>{ this.props.data._id }</td>
              <td>{ this.props.data.empName }</td>
              <td>{ this.props.data.empSal }</td>
              <td>{ this.props.data.empJob }</td>
              <td><input type='button' value='删除' onClick={()=>{
              	this.props.del(this.props.data.empName,this.props.curPage)
              }}/></td>
            </tr>
		)
	}
}


export default Table