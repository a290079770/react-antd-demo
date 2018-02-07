import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import AddEmp from './addEmp.js';
import Btns from './btns.js';
import PageInfo from './pageInfo.js';
import SearchEmp from './search.js';
import Table from './table.js';
import {asyncGetEmp} from './empAction.js';
import './emp.css';
import {del} from './empAction.js'
import {showAddp} from './empAction.js'
import {addEmp1} from './empAction.js'
import {cancle} from './empAction.js'



class Emp extends React.Component{
	constructor(props){
		super(props)
	}

    componentWillMount(){
    	this.props.dispatch(asyncGetEmp())
    }

	render(){
		return(
		  <div>	
            <SearchEmp/>
            <AddEmp showAddp={(flag)=>this.props.dispatch(showAddp(flag))}
              AddpHide={this.props.showAddp}
              addEmp1={(empName,empSal,empJob)=>this.props.dispatch(addEmp1(empName,empSal,empJob))}
              cancle ={(empName,empSal,empJob)=>this.props.dispatch(cancle(empName,empSal,empJob))}
            />
            <Table data={this.props.emps.data} del={(empName,curPage)=>this.props.dispatch(del(empName,curPage))} curPage={this.props.emps.curPage}/>
            <PageInfo pageInfo={{curPage:this.props.emps.curPage,
                                 eachPage:this.props.emps.eachPage,
                                 maxPage:this.props.emps.maxPage,
                                 count:this.props.emps.count}}/>
            <Btns/>
          </div>  
		)
	}
}

function select(state){
	return state
}

export default connect(select)(Emp)