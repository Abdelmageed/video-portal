import React, {Component} from 'react';

import LoginForm from '../containers/LoginForm';

export default class LoginPage extends Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <h3>Login</h3>
        <LoginForm />
      </div>
    );
  }
}