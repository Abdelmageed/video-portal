import React, {Component} from 'react';

import VideoRating from '../containers/VideoRating';
import Video from './Video';
import VideoList from '../containers/VideoList';
import {apiUrl} from '../constants/endpoints';
import {Grid, Row, Col} from 'react-bootstrap';

export default class VideoDetailsPage extends Component {
  
  constructor(props) {
    super(props);
    
    this.activeVideo = null;
    this.setActiveVideo = this.setActiveVideo.bind(this);

  }
  
  
  setActiveVideo(videoRef) {
    if(this.activeVideo && this.activeVideo != videoRef) {
      this.activeVideo.pause();
    }
    this.activeVideo = videoRef;
  }
  
  
  render() {
    return (
      <div>
        <h3>Video Details</h3>
        <Grid fluid={true}>
          <Row>
            <Col md={8} xs={12}>
            {
              (this.props.video._id)?
                <Video 
                  id={this.props.video._id}
                  name={this.props.video.name}
                  description={this.props.video.description}
                  ratings={this.props.video.ratings}
                  source={apiUrl + this.props.video.url}
                  setActive={this.setActiveVideo}
                />
              :
                null
            }
            </Col>
            <VideoList setActiveVideo={this.setActiveVideo}/>
          </Row>
        </Grid>
        
      }
      </div>
    );
  }
}