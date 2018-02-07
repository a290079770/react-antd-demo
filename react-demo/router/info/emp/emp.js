import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './emp.css';
import {connect} from 'react-redux'




class Emp extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			curPage:1,
          	maxPage:0,
          	eachPage:10,
          	count:0,
          	data:[]
		}
	}

    componentWillMount(){
    	this.getEmpByPage()
    }
   
    getEmpByPage(){
       
    //   $.ajax({
			 //  type: "POST",
			 //  url: "/emp/getEmpByPage",
			 //  data:this.state,
			 //  async:false,
			 //  success:(data)=> {
			 //  	this.state = Object.assign({},{
    //                 curPage:data.curPage,
		  //         	maxPage:Math.ceil(data.count/data.eachPage),
		  //         	eachPage:data.eachPage,
		  //         	count:data.count,
		  //         	emp:data.data.map((item)=>{
    //                       return Object.assign({},item)
			 //  	     	}
			 //  	     )
			 //  	   })
			 //  }
	   // })
	   // 
	   
	   fetch("/emp/getEmpByPage", {
			    method: "POST",
			    headers: {
			        "Content-Type": "application/x-www-form-urlencoded"
			    },
			    body: `eachPage=${this.state.eachPage}&curPage=${this.state.curPage}`,
				credentials: 'include'
			}).then(function(response) {
			    return response.json();
			}).then((data)=>this.setState(data));
    }


    changeEachPage(eachPage){
    	this.state.eachPage = eachPage;
    	this.getEmpByPage();
    }

    changeSelectPage(index){
       alert(index)
    } 

    nextPage(){
       if(this.state.curPage < maxPage){
       	  this.state.curPage++;
       	  this.getEmpByPage();
       }
    }

    prevPage(){
       if(this.state.curPage > 1){
       	  this.state.curPage--;
       	  this.getEmpByPage();
       }
    }
    firstPage(){
       this.state.curPage = 1;
       this.getEmpByPage();
    }
    lastPage(){
          this.state.curPage = this.state.maxPage
       	  this.getEmpByPage();
    }
    

	render(){ 

		return (
           <div>
			 	<SearchEmp />
			 	<AddEmp />
			    <Table data={this.state.data}/>
			    <PageInfo pageInfo={{eachPage:this.state.eachPage,
                                     curPage:this.state.curPage, 
                                     maxPage:this.state.maxPage,
                                     count:this.state.count
			                         }} changeEachPage={(eachPage)=>this.changeEachPage(eachPage)}/>
			    <ToPage 
                  firstPage={()=>this.firstPage()}
                  nextPage={()=>this.nextPage()}
                  prevPage={()=>this.prevPage()}
                  lastPage={()=>this.lastPage()}
			    />
          </div>
		)
	}
}

class SearchEmp extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
            <div>
            	<input type="text" name="" id="searchInput"/>
			 	<button>查询</button>
			 	<p id="content"></p>
            </div>
		)
	}
}

class AddEmp extends React.Component{
	constructor(props){
		super(props)
	}
    render(){
    	return (
             <div>
             	<p><button>+添加员工</button></p>
			 	<p>
			 		<input type="text" name="" placeholder="请输入员工姓名" id="inputName"/>
			 		<input type="number" name="" placeholder="请输入工资" id="inputSal"/>
			 		<input type="text" name="" placeholder="请输入岗位" id="inputJob"/>
			 		<button id="confirmBtn">确认</button>
			 		<button id="cancleBtn">取消</button>
			 	</p> 	
             </div>
    	)
    }
}

class Table extends React.Component{
	constructor(porps){
		super(porps)
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
                            return <ForEmp foremp={item} key={index}/>
                         })
                       }
			 		</tbody>
			 	</table>
			 </div>
		)
	}
}



class ForEmp extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return (
           <tr>
              <td>{this.props.foremp._id}</td>
              <td>{this.props.foremp.empName}</td>
              <td>{this.props.foremp.empJob}</td>
              <td>{this.props.foremp.empSal}</td>
              <td><input type='button' value='删除'/></td>
           </tr>
		)
	}
}


class Options extends React.Component{
	constructor(props){
		super(props)
			
	}

	render(){
		var temp = [];
		for(let i = 1 ; i <= this.props.options;i++){
              	temp.push(<option key={'option'+i} value={i}>{i}</option>)
              }     
		return (
			<select>
           {
              temp
           }
           </select>
		)
	}
}

class ToPage extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
            <div>
			 	<button onClick={()=>this.props.firstPage()}>首页</button>
			 	<button onClick={()=>this.props.nextPage()}>下一页</button>
			 	<button onClick={()=>this.props.prevPage()}>上一页</button>
			    <button onClick={()=>this.props.lastPage()}>尾页</button>
			 	<button>退出</button>
			</div>
		)
	}
}  

class PageInfo extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
            <div>
			 	当前页 <span>
                          <Options options={this.props.pageInfo.maxPage}/>
			 	       </span>
			 	每页显示 <input type="number" ref='eachPage' 
			 	  defaultValue={this.props.pageInfo.eachPage} onChange={()=>this.props.changeEachPage(this.refs.eachPage.value)}/>
			 	总页数 <span id="maxPage">{this.props.pageInfo.maxPage}</span>
			 	总数量 <span id="count">{this.props.pageInfo.count}</span>
		   </div>
		)
	}
}  


// function select(state){
// 	return state
// }



// export default connect(select)(Emp)
// 
export default Emp