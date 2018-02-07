import React from 'react';


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

export default SearchEmp