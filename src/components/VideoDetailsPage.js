import React, {Component} from 'react';

export default class VideoDetailsPage extends Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <h3>Video Details</h3>
        <h4>{this.props.params.id}</h4>
      </div>
    );
  }
}