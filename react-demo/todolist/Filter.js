import React from 'react';

class Filter extends React.Component{
	constructor(props){
		super(props)
	}

    clickHandle(name,showType='all'){
         if(name==showType){
           return <span>{name}</span>
         }else{
           return <a href='#' onClick={(e)=>{
           	e.preventDefault();
            this.props.setShowType(name)
           }}
           >{name}</a>
         }
    }

	render(){
		return (
             <div>
               SHOW:
               {' '}
               {this.clickHandle('all',this.props.showType)}
               {' '}
               {this.clickHandle('complated',this.props.showType)}
               {' '}
               {this.clickHandle('active',this.props.showType)}
             </div>
			)
	}
}

// Filter.defaultProps = {
//   showType:'all'
// }

export default Filter