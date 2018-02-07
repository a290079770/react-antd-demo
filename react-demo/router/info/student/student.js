import React from 'react';
import ReactDOM from 'react-dom';
import './student.css'

class Student extends React.Component{
	constructor(props){
      super(props);
      this.state={
      	pics:[{src:'../../../../images/image_01.png',selected:true},
      	      {src:'../../../../images/image_02.png',selected:false},
      	      {src:'../../../../images/image_03.png',selected:false},
      	      {src:'../../../../images/image_04.png',selected:false},
      	      {src:'../../../../images/image_05.png',selected:false},
      	      {src:'../../../../images/image_06.png',selected:false}],
      	index:0
             }
	      }

    componentWillMount(){
      this.changePic()

    }

    componentWillUnmount(){
    	clearInterval(this.setTime)
    } 

    changePic(){
	    this.setTime = window.setInterval(()=>{
	           if(this.state.index < 5){
	           	 this.state.index++
	           }else{
	              this.state.index = 0;
	           }
	           this.setState({
	           		index:this.state.index,
	           		pics:this.state.pics.map((item,index)=>{
	                  if(index == this.state.index){
	                  	return Object.assign({},item,{selected:true})
	                  }else{
	                  	return Object.assign({},item,{selected:false})
	                  }
	           		})
	           	})
	    	},1000)
    }

    mouseEnter($index){
       clearInterval(this.setTime)
       this.setState({
       	index:$index,
       	pics:this.state.pics.map((item,index)=>{
	                  if(index == $index){
	                  	return Object.assign({},item,{selected:true})
	                  }else{
	                  	return Object.assign({},item,{selected:false})
	                  }
	           		})
       })
    }

    mouseLeave(){
       this.changePic()
    }

    //渲染
	render(){
		return (
              <div id='lunbo'>
                 <img src={this.state.pics[this.state.index].src}/>
                 <Btns pics={this.state.pics} 
                 mouseEnter={($index)=>this.mouseEnter($index)}
                 mouseLeave={()=>this.mouseLeave()}/>
              </div>
			)
	}
}



class Btns extends React.Component{
	constructor(props){
      super(props);
    }
      
	render(){
		return (
                 <ul id='btns'>
                 	{this.props.pics.map((item,index)=>{
                      return (<li key={index+'li'} className={item.selected?'selected':'reselected'} 
                          onMouseEnter={()=>this.props.mouseEnter(index)}
                          onMouseLeave={()=>this.props.mouseLeave()}
                      	></li>)
                 	})}
                 </ul>
			)
	}
}

export default Student