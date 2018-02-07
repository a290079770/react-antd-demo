import React from 'react';

import { Radio } from 'antd';
const RadioGroup = Radio.Group;

export default class GenderRadio extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			value:1
		}
	}

    onChange(e) {
	    console.log('radio checked', e.target.value);
	    this.setState({
	      value: e.target.value,
	    });
    }

	render(){
		return (
          <RadioGroup style={{width:50+'%'}} onChange={(e)=>this.onChange(e)} value={this.state.value}>
	        <Radio value={1}>男</Radio>
	        <Radio value={2}>女</Radio>
	      </RadioGroup>
		)
	}
}