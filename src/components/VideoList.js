import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import Video from './Video';
import {apiUrl} from '../constants/endpoints';

export default class VideoList extends Component {
  
  constructor (props) {
    super(props);
    
    this.activeVideo = null;
    
    this.setActiveVideo = this.setActiveVideo.bind(this);
  }
  
  //if there was an active (playing) video other than the video that has just played. Pause it, and set active video to the new video
  setActiveVideo(videoRef) {
    if(this.activeVideo && this.activeVideo != videoRef) {
      this.activeVideo.pause();
    }
    this.activeVideo = videoRef;
  }
  
  render() {
    const videoCols = this.props.videos.map((video)=> (
      <Col xs={6} md={4} key={video._id}>
        <Video
          id={video._id}
          name={video.name}
          description={video.description}
          ratings={video.ratings}
          source={apiUrl + video.url}
          setActive={this.setActiveVideo}
        />
      </Col>
    ));
    let videoRows = [];
    for(let i = 0; i < videoCols.length - 2; i+=3) {
      videoRows.push((
        <Row key={i}>
          {videoCols[i]}
          {videoCols[i + 1]}
          {videoCols[i + 2]}
        </Row>
      ));
    }
    return (
      <Grid fluid={true}>
        {videoRows}
      </Grid>
    );    
  }
}