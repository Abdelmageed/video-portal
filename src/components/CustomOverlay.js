import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button, Overlay, NavItem} from 'react-bootstrap';

export default class CustomOverlay extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: false  
    };
    
    this.toggle = this.toggle.bind(this);
  }
  
  toggle(){
    this.setState((prevState)=> ({
      show: !prevState.show
    }));
  }
  
  render(){
    return (
      <NavItem style={{
            position: "relative"
        }}>
        <Button ref="target" onClick={()=>this.toggle()}>
          {this.props.triggerText}
        </Button>
        <Overlay
         show={this.state.show}
         onHide={()=> this.setState({show: false})}
         placement="right"
         container={this}
         rootClose
         target={()=> ReactDOM.findDOMNode(this.refs.target)}
         >
          {this.props.popover}
        </Overlay>
      </NavItem>
    );
  }
}
