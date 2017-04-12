import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import VideoRating from '../containers/VideoRating';
import Video from './Video';
import VideoList from '../containers/VideoList';
import {apiUrl} from '../constants/endpoints';
import getDocWidth from '../utils/getDocWidth';

export default class VideoDetailsPage extends Component {
  
  constructor(props) {
    super(props);
    
    this.activeVideo = null;
    this.setActiveVideo = this.setActiveVideo.bind(this);
    this.handleResize = this.handleResize.bind(this);

    window.addEventListener('resize', this.handleResize);
    
    this.state = {
      extraSmall: (getDocWidth() < 496)
    };
  }
  
  setActiveVideo(videoRef) {
    if(this.activeVideo && this.activeVideo != videoRef) {
      this.activeVideo.pause();
    }
    this.activeVideo = videoRef;
  }
  
  handleResize() {
    
    this.setState({
      extraSmall: (getDocWidth() < 576)
    });
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  
  render() {
    
    const mainVideo = (
      <Video
        id={this.props.video._id}
        name={this.props.video.name}
        description={this.props.video.description}
        ratings={this.props.video.ratings}
        source={apiUrl + this.props.video.url}
        setActive={this.setActiveVideo}
        isMain={true}
      />
    );
    
    const grid = (
      <Grid fluid={true}>
          <Row>
            <Col md={8}>
            {
              (this.props.video._id)?
                mainVideo
              :
                null
            }
            </Col>
            <Col md={4}>
              <VideoList setActiveVideo={this.setActiveVideo}/>
            </Col>
          </Row>
        </Grid>
    );
  
  const extraSmallList = (
    <div>
      <div style={{marginBottom: 50}}>
      {
        (this.props.video._id)?
          mainVideo
        :
          null
      }
      </div>
      <VideoList setActiveVideo={this.setActiveVideo}/>
    </div>
  );
    
    return (
      <div>
        <h3>Video Details</h3>
        {
          (this.state.extraSmall)?
          extraSmallList : grid
        }      
      </div>
    );
  }
}