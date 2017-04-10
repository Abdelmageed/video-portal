import React, {Component} from 'react';
import InfiniteScroll from 'redux-infinite-scroll';
import {Col} from 'react-bootstrap';

import Video from './Video';
import {apiUrl} from '../constants/endpoints';

export default class VideoList extends Component {
  
  constructor(props){
    super(props);
    
    this.renderVideos = this.renderVideos.bind(this);
  }
  
  renderVideos() {
    return this.props.videos.map((video)=> (
      <Video
          key={video._id}
          id={video._id}
          name={video.name}
          description={video.description}
          ratings={video.ratings}
          source={apiUrl + video.url}
          setActive={this.props.setActiveVideo}
          withLink={true}
      />
    ));
  }
  
  render() {
    return (
      <Col md={4} xs={12}>
        <InfiniteScroll
          elementIsScrollable={false}
          items={this.renderVideos()}
          loadMore={this.props.loadMore}
          hasMore={this.props.hasMore}
          loadingMore={this.props.loading}
          threshold={300}
        />
      </Col>
    );
  }
  
}