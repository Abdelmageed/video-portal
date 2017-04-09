import React, {Component} from 'react';

export default class LoginPage extends Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log(this.props);
    return (
      <div>
        <h3>Login</h3>
        <button onClick={this.props.mockLogin}>login</button>
      </div>
    );
  }
}