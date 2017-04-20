import React, { Component } from 'react';
import { Link } from 'react-router';

export default class NotFoundPage extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div style={{
        marginTop: 200,
        width: '100%',
        textAlign: 'center'
      }}>
        <h4>
          404 Page Not Found
        </h4>
        <Link to="/"> Go back to homepage </Link>
      </div>
    );
  }
}