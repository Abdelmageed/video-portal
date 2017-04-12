import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import StarRating from 'react-bootstrap-star-rating';
import 'bootstrap-star-rating/css/star-rating.min.css';

export default class StarRatingForm extends Component {
  
  constructor(props) {
    super(props);
    
    this.starRating = null;
    this.handleRatingChange = this.handleRatingChange.bind(this);
    
    this.state = {
      showForm: false
    };
  }
  
  handleRatingChange(e, rating) {
    this.props.submitRating(rating);
  }
  
  render() {
    
    const starRating = (
      <StarRating 
      min={0} 
      max={5} 
      step={1}
      showCaption={false}
      starCaptions={{}}
      showClear={false}
      onRatingChange={this.handleRatingChange}
      size="sm"
      ref={(rating)=> {this.starRating = rating;}}/>
    );
  
  const rateButton = (
    <Button
     bsStyle="primary" 
     onClick={()=> {this.setState({showForm: true});}}>
      Rate <i className="fa fa-star"></i>
    </Button>
  )
    
    return (
    <div>
     {
       (this.state.showForm)?
        starRating : rateButton
     }
    </div>
    );
  }
}