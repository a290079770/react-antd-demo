import React from 'react';
import {
	firstPage,
	lastPage,
	prevPage,
	nextPage
} from './empAction.js';
import {connect} from 'react-redux';

class Btns extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
            <div>
			 	<button onClick={()=>this.props.dispatch(firstPage({curPage:1}))}>首页</button>
			 	<button onClick={()=>this.props.dispatch(nextPage(Object.assign({},{curPage:this.props.emps.curPage,eachPage:this.props.emps.eachPage,maxPage:this.props.emps.maxPage})))}>下一页</button>
			 	<button onClick={()=>this.props.dispatch(prevPage({curPage:this.props.emps.curPage}))}>上一页</button>
			    <button onClick={()=>this.props.dispatch(lastPage({curPage:this.props.emps.maxPage}))}>尾页</button>
			 	<button>退出</button>
			</div>
		)
	}
}  

function select(state){
    
    return state
}


export default connect(select)(Btns)