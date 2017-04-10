import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import InfiniteScroll from 'redux-infinite-scroll';

import Video from './Video';
import {apiUrl} from '../constants/endpoints';

export default class VideoGrid extends Component {
  
  constructor (props) {
    super(props);
    
    this.activeVideo = null;
    
    this.setActiveVideo = this.setActiveVideo.bind(this);
    this.renderVideos = this.renderVideos.bind(this);
  }
  
  //if there was an active (playing) video other than the video that has just played. Pause it, and set active video to the new video
  setActiveVideo(videoRef) {
    if(this.activeVideo && this.activeVideo != videoRef) {
      this.activeVideo.pause();
    }
    this.activeVideo = videoRef;
  }
  
  renderVideos() {
    const videoCols = this.props.videos.map((video)=> (
      <Col xs={6} md={4} key={video._id}>
        <Video
          id={video._id}
          name={video.name}
          description={video.description}
          ratings={video.ratings}
          source={apiUrl + video.url}
          setActive={this.setActiveVideo}
          withLink={true}
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
    return videoRows;
  }
  
  render() {
    return (
      <Grid fluid={true}>
        <InfiniteScroll
          elementIsScrollable={false}
          items={this.renderVideos()}
          loadMore={this.props.loadMore}
          hasMore={this.props.hasMore}
          loadingMore={this.props.loading}
          threshold={300}
        />
      </Grid>
    );
  }
}