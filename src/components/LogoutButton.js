import React, {Component} from 'react';

export default class LogoutButton extends Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <strong>{this.props.username}</strong>
        {' / '}
        <a style={{
            cursor: 'pointer',
          }}
          onClick={this.props.logout}>
          Logout</a>
      </div>
    )
  }
}