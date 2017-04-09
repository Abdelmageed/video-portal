import React, {Component} from 'react';
import * as Bootstrap from 'react-bootstrap';
import {IndexLink} from 'react-router';

import LogoutButton from '../containers/LogoutButton';

export default class Nav extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
      return (
        <Bootstrap.Navbar>
        <Bootstrap.Navbar.Header>
          <Bootstrap.Navbar.Brand>
            <IndexLink style={{cursor:'pointer'}} to="/">Video Portal</IndexLink>
          </Bootstrap.Navbar.Brand>
        </Bootstrap.Navbar.Header>
        {(this.props.username === '')?
          null :
            
         <Bootstrap.Nav
           pullRight>
            <LogoutButton username={this.props.username} />
           
         </Bootstrap.Nav>
        }
        </Bootstrap.Navbar>
      );
    }
}
