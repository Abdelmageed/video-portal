import React, {Component} from 'react';
import StarRating from 'react-bootstrap-star-rating';
import 'bootstrap-star-rating/css/star-rating.min.css';

export default class StarRatingForm extends Component {
  
  constructor(props) {
    super(props);
    
    this.starRating = null;
    this.handleRatingChange = this.handleRatingChange.bind(this);
  }
  
  handleRatingChange(e, rating) {
    this.props.submitRating(rating);
  }
  
  render() {
    return (
      <StarRating 
      min={0} 
      max={5} 
      step={1}
      starCaptions={{}}
      showClear={false}
      onRatingChange={this.handleRatingChange}
      ref={(rating)=> {this.starRating = rating;}}/>
     
    );
  }
}