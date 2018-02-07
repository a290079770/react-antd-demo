import React, { Component } from 'react';

export default class Wrap extends Component {
  constructor(props) {
     super(props);
     this.state = {
     }
  }

  render() {
    return (
      <div className="wrap">
        {this.props.children}
      </div>
    );
  }
}


