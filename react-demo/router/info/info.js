import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory,Link} from 'react-router';
import './info.css';




class Info extends React.Component{
	constructor(props){
		super(props)
	}
	
	render(){
		return (
              <div>
                 <ul>
	                 <li><Link to='/info/student'>学生管理</Link></li> 
	                 <li><Link to='/info/teacher'>教师管理</Link></li> 
	                 <li><Link to='/info/emp'>员工管理</Link></li> 
	                 <li><Link to='/info/system'>系统管理</Link></li>  
                 </ul>
                 <div>{this.props.children}</div>
              </div>

		)
	}
}

export default Info