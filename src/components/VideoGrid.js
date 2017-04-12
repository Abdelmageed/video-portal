import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import InfiniteScroll from 'redux-infinite-scroll';

import Video from './Video';
import {apiUrl} from '../constants/endpoints';
import getDocWidth from '../utils/getDocWidth';

export default class VideoGrid extends Component {
  
  constructor (props) {
    super(props);
    
    this.activeVideo = null;
    this.grid =  null;
    
    this.setActiveVideo = this.setActiveVideo.bind(this);
    this.renderVideos = this.renderVideos.bind(this);
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);
    
    this.state = {
      //Bootstrap .col-xs is at 496
      //if doc normalized width is less than that of BS .col-xs set cols for a Row to 2 otherwise 3
      colsPerRow: (getDocWidth() < 496) ? 2 : 3
    };
  }
  
  handleResize() {
    this.setState({
      colsPerRow: (getDocWidth() < 496) ? 2 : 3
    });
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
    let rows = [];
    let cols = this.state.colsPerRow;
    for(let i = 0; i < videoCols.length - (cols - 1); i+=cols) {
      rows.push((
        <Row key={i} style={{marginBottom: 30}}>
          {videoCols.slice(i, i+cols)}
        </Row>
      ));
      
    }
    return rows;
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  
  render() {
    return (
      <Grid fluid={true} id="videoGrid">
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