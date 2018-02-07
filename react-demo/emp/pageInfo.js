import React from 'react';


class PageInfo extends React.Component{
	constructor(props){
		super(props)

	}
	render(){

		return (
            <div>
			 	当前页 <span>
                          <Select curPage={this.props.pageInfo.maxPage}/>
			 	       </span>
			 	每页显示 <input type="number" value={this.props.pageInfo.eachPage} onChange={()=>console.log(1)}/>
			 	总页数 <span id="maxPage">{this.props.pageInfo.maxPage}</span>
			 	       
			 	总数量 <span id="count">{this.props.pageInfo.count}</span>

		   </div>
		)
	}
}  

class Select extends React.Component{
	constructor(props){
		super(props)
        
	}

	render(){
        var arr = [];
        for(var i = 1 ; i <= this.props.curPage ; i++){
        	arr.push(i)
        } 
		return(
          <select>
             {
             	arr.map((item,index)=>{
                   return <option key={index+'option'} value='index'>{item}</option>
             	})
             } 
          </select>
		)
	}
}

export default PageInfo