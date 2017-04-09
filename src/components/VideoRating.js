import React, {Component} from 'react';
import StarRating from 'react-bootstrap-star-rating';
import 'bootstrap-star-rating/css/star-rating.min.css';

import CustomOverlay from './CustomOverlay';
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
//    forceUpdate
  }
  
  componentDidUpdate() {
    setTimeout(()=> {
      this.loadRating();
    }, 1000); //dirty work around here. There is a bug where the component is updated with the old ratings array
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
        showClear={false}
        readonly={true}
        ref={(rating)=> {this.starRating = rating;}}/>
       {
         (this.state.hasRated)? 
          null 
            :
         <CustomOverlay 
          popover={
            <StarRatingForm submitRating={this.submitRating} />
          } 
          triggerText="Rate" />
       }
      </div>
    );
  }
}