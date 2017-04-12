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
    const containerStyle = {
      boxShadow: '0 2p 5px rgba(0, 0, 0, 0.4)',
      backgroundColor: 'white',
      textAlign: 'center',
      padding: '10px',
    };
    
    const titleStyle = {
      textAlign: 'center',
      fontFamily: 'verdana helvetica sans-serif',
      fontSize: 18,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    };
    
    const playerStyle = {
      width: '100%',
      height: (this.props.isMain)? 500 : 300
    };
    
    const descStyle = {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      width: 100,
      
    }
    
    const classNames = ['video-container'];
    if (!this.props.isMain) {
      classNames.push('list-video');
    }
    
    return (
      <div className={classNames.join(' ')}>
        <div className="video-title" style={titleStyle}>
        {
          (this.props.isMain)?
            this.props.name
            :
           <Link to={`/video/${this.props.id}`}>
            {this.props.name}
           </Link>
        }
        </div>
        <div className="video-player" >
          <video style={playerStyle}
           controls 
           ref={(ref) => {this.videoRef = ref;}}
           onPlay={this.handleOnPlay}
           src={this.props.source} />
        </div>
         {
          (this.props.isMain)?
          <p className="video-description">
            {this.props.description}
          </p>
            :
          null
         }
          
        <VideoRating 
          id={this.props.id}
          ratings={this.props.ratings}
          showEdit={this.props.isMain}
        />
      </div>
    )
  }
}