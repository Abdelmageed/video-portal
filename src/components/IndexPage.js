import React, {Component} from 'react';

import VideoList from '../containers/VideoList';

export default class IndexPage extends Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <h3>Index</h3>
        <VideoList />
      </div>
    );
  }
}