import React, {Component} from 'react';
import StarRating from 'react-bootstrap-star-rating';
import 'bootstrap-star-rating/css/star-rating.min.css';
import {Grid, Row, Col} from 'react-bootstrap';

import StarRatingForm from './StarRatingForm';

export default class VideoRating extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      hasRated: false
    };
    
    this.starRating = null;
    
    this.loadRating = this.loadRating.bind(this);
    this.submitRating = this.submitRating.bind(this);
  }
  
    loadRating() {
    const avgRating = this.props.ratings.reduce((acc, val) => {
      return acc + val;
    }, 0) / this.props.ratings.length;
    
    this.starRating.update(avgRating.toFixed(1));
  }
  
  submitRating(rating) {
    this.props.rateVideo(rating);
    this.setState({
      hasRated: true
    });
    setTimeout(()=> {
      this.loadRating();
    }, 1000);
  }
   
  componentDidMount() {
    this.loadRating();
  }
  
  render() {
    return (
      <div>
            <StarRating
            min={0} 
            max={5} 
            step={0.1}
            showCaption={true}
            defaultCaption={"{rating}"}
            starCaptions={{}}
            starCaptionClasses={{}}
            showClear={false}
            readonly={true}
            size="sm"
            ref={(rating)=> {this.starRating = rating;}}/>
           {
             (this.state.hasRated || !this.props.showEdit)? 
              null 
                :
                <StarRatingForm submitRating={this.submitRating} />
           }
      </div>
    );
  }
}