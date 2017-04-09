import React, {Component, PropTypes} from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

export default class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      requiredFieldsError: ''
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.validateSubmit = this.validateSubmit.bind(this);
    this.hasRequiredFieldsError = this.hasRequiredFieldsError.bind(this);
    this.removeRequiredFieldsError = this.removeRequiredFieldsError.bind(this);
  }
  
  handleChange(e){
    let val = e.target.value;
    let name = e.target.name;
    this.setState({
      [name]: val
    }, ()=> {
      this.removeRequiredFieldsError();
    });
    
  }
  
  hasRequiredFieldsError (){
    return (this.state.username === '' ||
      this.state.password === '');
  }
  
  removeRequiredFieldsError (){
    if (this.state.username !== '' &&
      this.state.password !== ''){
      this.setState({
        requiredFieldsError: ''
      });
    }
  }
  
  validateSubmit(){
    if(this.hasRequiredFieldsError()){
      this.setState({
        requiredFieldsError: 'Please provide a username and a password'
      });
    } else {
      const credentials = {
        username: this.state.username,
        password: this.state.password
      };
      this.props.submit(credentials);
    }
 
  }
  
  render(){
    return (
    <form onKeyUp={(e)=>{if(e.keyCode==13)this.validateSubmit();}}
         style={{
//          position: 'absolute',
          margin: 'auto',
          border: '1px solid #ccc',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
          padding: '10px',
          borderRadius: '3%',
          width: '50%'
        }}>
      <FormGroup controlId="username">
        <ControlLabel>Username</ControlLabel>
        <FormControl onChange={this.handleChange} value={this.state.username} name="username" type="text" placeholder="Enter your name" />
      </FormGroup>
      <FormGroup controlId="password">
        <ControlLabel>Password</ControlLabel>
        <FormControl onChange={this.handleChange} value={this.state.password} name="password" type="password" />
      </FormGroup>
      {
        (this.state.requiredFieldsError != '')?
          <div 
           className="required-fields-error"
           style={{color: '#d00'}}>
            {this.state.requiredFieldsError}
          </div> :
          null
      }
      {
        (this.props.error && this.props.error != '')?
        <div style={{color: '#d00'}}
        className="error-label">{this.props.error}</div>
        :null
      }
      <Button
              className="login-button"
              onClick={this.validateSubmit}
              >
              Sign in
      </Button>
    </form>);
  }
}