import React, {Component} from 'react';

import VideoGrid from '../containers/VideoGrid';

export default class IndexPage extends Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <h3>Index</h3>
        <VideoGrid />
      </div>
    );
  }
}