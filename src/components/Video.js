import React, {Component} from 'react';

import VideoRating from '../containers/VideoRating';
import {Link} from 'react-router';

export default class Video extends Component {
  
  constructor(props) {
    super(props);
    
    this.videoRef = null;
    
    this.handleOnPlay = this.handleOnPlay.bind(this);
  }
  
  handleOnPlay() {
    this.props.setActive(this.videoRef);
  }
  
  render() {
    return (
      <div>
        <div className="video-title">
         <Link to={`video/${this.props.id}`}>
          {this.props.name}
         </Link>
        </div>
        <div className="video-player">
          <video 
           controls 
           ref={(ref) => {this.videoRef = ref;}}
           onPlay={this.handleOnPlay}>
            <source src={this.props.source} />
          </video>
        </div>
        <p className="video-description">
          {this.props.description}
        </p>
        <VideoRating 
          id={this.props.id}
          ratings={this.props.ratings}
        />
      </div>
    )
  }
}