import React, {Component} from 'react';

export default class App extends Component{
  
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div>
        <h2>Main</h2>
        {this.props.children}
      </div>
    )
  }
}